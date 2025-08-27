// firebase.js
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

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Save donation
export const saveDonation = async (donationData) => {
  const donationsRef = ref(db, "donations");
  const newDonationRef = push(donationsRef);
  await set(newDonationRef, {
    ...donationData,
    createdAt: Date.now(),
  });
};

// Get *all* donations (array)
export const getDonations = async () => {
  const donationsRef = ref(db, "donations");
  const snapshot = await get(donationsRef);

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([id, data]) => ({
    id,
    ...data,
  }));
};

// Get *recent* donations (array)
export const getRecentDonations = async (limitCount = 5) => {
  const donationsRef = ref(db, "donations");
  const donationsQuery = query(
    donationsRef,
    orderByChild("createdAt"),
    limitToLast(limitCount)
  );

  const snapshot = await get(donationsQuery);
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val())
    .map(([id, data]) => ({
      id,
      ...data,
    }))
    .sort((a, b) => b.createdAt - a.createdAt);
};
