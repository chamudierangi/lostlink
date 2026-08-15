import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

const ITEMS_COLLECTION = 'items';

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// 1. Save Report
export const createItemReport = async (itemData, imageFile) => {
  let imageUrl = 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80';

  if (imageFile) {
    imageUrl = await convertFileToBase64(imageFile);
  }

  const payload = {
    ...itemData,
    image: imageUrl,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, ITEMS_COLLECTION), payload);
  return { id: docRef.id, ...payload };
};

// 2. Fetch All Items (Without strict indexing issues)
export const fetchAllItems = async () => {
  try {
    const snapshot = await getDocs(collection(db, ITEMS_COLLECTION));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Client-side sort: අලුත්ම items උඩට එන ලෙස
    return items.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
};

// 3. Mark as Returned
export const markItemReturnedInDB = async (itemId) => {
  const itemDoc = doc(db, ITEMS_COLLECTION, itemId);
  await updateDoc(itemDoc, { status: 'returned' });
};