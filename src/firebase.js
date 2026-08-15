import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFxnzR-bsDDeK-og46WscG4c7WXqqIklI",
  authDomain: "lostlink-efe0a.firebaseapp.com",
  projectId: "lostlink-efe0a",
  storageBucket: "lostlink-efe0a.firebasestorage.app",
  messagingSenderId: "797693753757",
  appId: "1:797693753757:web:0f19fc2804206ab0f85774",
  measurementId: "G-46ZPQQ7ZG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);