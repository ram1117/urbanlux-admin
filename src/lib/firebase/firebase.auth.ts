import {
  onAuthStateChanged as _onAuthStateChanged,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { firebaseAuth } from "./firebase.config";

export function onAuthStateChanged(cb: (authUser: User | null) => any) {
  return _onAuthStateChanged(firebaseAuth, cb);
}

export async function signOutUser() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {}
}

export async function forgotPassword(email: string) {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
  } catch (error) {}
}
