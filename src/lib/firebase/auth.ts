import { auth, db } from "./firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

interface UserData {
  name: string
  city: string
  email: string
  location: string
  contact: string
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export const signUpWithEmail = async (email: string, password: string, userData: UserData) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, "users", result.user.uid), {
      ...userData,
      email,
    })
    return { user: result.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return { user: result.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export { auth }