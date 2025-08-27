// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOfObMWS3GokYpcBJP1FRGp-47FCQIME8",
  authDomain: "harvesta-donation.firebaseapp.com",
  databaseURL: "https://harvesta-donation-default-rtdb.firebaseio.com",
  projectId: "harvesta-donation",
  storageBucket: "harvesta-donation.firebasestorage.app",
  messagingSenderId: "535139198182",
  appId: "1:535139198182:web:3ebc0764ad8fd559f94727",
  measurementId: "G-CJN2EPN8LH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Save donation to Realtime DB
export async function saveDonation(donorData) {
  try {
    const donationsRef = ref(db, "donations");
    const newDonationRef = push(donationsRef);

    await set(newDonationRef, {
      name: donorData.name,
      email: donorData.email,
      amount: donorData.amount,
      reference: donorData.reference,
      status: donorData.status || "completed",
      paymentMethod: "paystack",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log("✅ Donation saved with ID:", newDonationRef.key);
    return { success: true, id: newDonationRef.key };
  } catch (error) {
    console.error("❌ Error saving donation:", error);
    return { success: false, error: error.message };
  }
}

// Get all donations (for admin)
export async function getAllDonations() {
  try {
    const snapshot = await get(ref(db, "donations"));
    if (!snapshot.exists()) return { success: true, donations: [] };

    const data = snapshot.val();
    const donations = Object.entries(data).map(([id, donation]) => ({
      id,
      ...donation,
    }));

    // Sort by createdAt descending
    donations.sort((a, b) => b.createdAt - a.createdAt);

    return { success: true, donations };
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    return { success: false, error: error.message };
  }
}

// Get recent donations (public display)
export async function getRecentDonations(limitCount = 10) {
  try {
    const donationsRef = query(
      ref(db, "donations"),
      orderByChild("createdAt"),
      limitToLast(limitCount)
    );

    const snapshot = await get(donationsRef);
    if (!snapshot.exists()) return { success: true, donations: [] };

    const data = snapshot.val();
    const donations = Object.entries(data).map(([id, donation]) => ({
      id,
      name: donation.name || "Anonymous",
      amount: donation.amount,
      createdAt: donation.createdAt,
    }));

    // Sort latest first
    donations.sort((a, b) => b.createdAt - a.createdAt);

    return { success: true, donations };
  } catch (error) {
    console.error("❌ Error fetching recent donations:", error);
    return { success: false, error: error.message };
  }
}

// Calculate total donations
export async function getTotalDonations() {
  try {
    const snapshot = await get(ref(db, "donations"));
    if (!snapshot.exists()) return { success: true, total: 0, count: 0 };

    const data = snapshot.val();

    let total = 0;
    let count = 0;

    Object.values(data).forEach((donation) => {
      total += parseInt(donation.amount) || 0;
      count++;
    });

    return {
      success: true,
      total,
      count,
      formatted: total.toLocaleString(),
    };
  } catch (error) {
    console.error("❌ Error calculating total donations:", error);
    return { success: false, error: error.message };
  }
}
