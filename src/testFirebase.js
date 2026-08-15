import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const runFirebaseTest = async () => {
  try {
    const docRef = await addDoc(collection(db, "test_connection"), {
      message: "Firebase connected successfully!",
      timestamp: new Date()
    });
    console.log("✅ Firestore Write Success! Document ID:", docRef.id);

    const snapshot = await getDocs(collection(db, "test_connection"));
    console.log("✅ Firestore Read Success! Total docs:", snapshot.size);

    alert("🎉 Firebase Connection is Working Perfectly!");
  } catch (error) {
    console.error("❌ Firebase Connection Failed:", error);
    alert("Firebase Error: " + error.message);
  }
};