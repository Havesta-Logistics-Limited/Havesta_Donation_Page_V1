import { ref, onValue, off } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase/firebase";
import { getTimeAgo } from "../utils/helpers";

export const useDonations = () => {
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const donationsRef = ref(db, "donations");

    // Subscribe to realtime updates
    onValue(donationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const transformedDonations = Object.entries(data).map(
          ([id, donation]) => ({
            id,
            name: donation.name?.split(" ")[0] || "Anonymous",
            amount: donation.amount,
            createdAt: Number(donation.createdAt || donation.timestamp),
            timeAgo: getTimeAgo(donation.createdAt || donation.timestamp),
            reference: donation.reference,
            status: donation.status,
          })
        );

        transformedDonations.sort((a, b) => b.createdAt - a.createdAt);
        setDonators(transformedDonations);
      } else {
        setDonators([]);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      off(donationsRef);
    };
  }, []);

  return { donators, loading };
};
