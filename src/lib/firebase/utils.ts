import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db,auth } from "./firebase"; // Ensure app is imported from firebase.ts


export const createUser = async (userData: any) => {
  try {
    // Create user authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    console.log("User Auth Created:", userCredential.user.uid);

    // Store user data in Firestore
    const docRef = await addDoc(collection(db, "users"), {
      name: userData.name,
      email: userData.email,
      city: userData.city,
      contact: userData.contact,
      location: { latitude: userData.latitude, longitude: userData.longitude },
    });

    console.log("User Data Stored in Firestore:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error Registering User:", error);
    throw error;
  }
};