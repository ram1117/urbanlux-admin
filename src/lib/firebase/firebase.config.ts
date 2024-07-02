import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSANGERID,
  appId: process.env.NEXT_PUBLIC_FB_APPID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENTID,
};
const firebaseApps = getApps();
const firebaseApp =
  firebaseApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
