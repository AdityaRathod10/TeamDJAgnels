import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Import getAuth
import { getStorage } from "firebase/storage" // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyCln5FHX886kLFcHfPtNTjBBiW9HDNJh3Q",
  authDomain: "tsechacks-b2df4.firebaseapp.com",
  projectId: "tsechacks-b2df4",
  storageBucket: "tsechacks-b2df4.appspot.com", // ❌ Fix incorrect URL
  messagingSenderId: "477904059044",
  appId: "1:477904059044:web:da14817be3e36dd6f98431",
  measurementId: "G-V1SNNJGD0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Initialize auth properly
const storage = getStorage(app) // ✅ Initialize storage

export { app, db, auth, storage }; // ✅ Export storage