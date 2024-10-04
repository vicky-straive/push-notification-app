import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAisdMF0f-S0ZcO6mrBVMxjuZDuB0cmDL4",
  authDomain: "flash-1787b.firebaseapp.com",
  projectId: "flash-1787b",
  storageBucket: "flash-1787b.appspot.com",
  messagingSenderId: "466677074806",
  appId: "1:466677074806:web:23b48f269c340b29cb8857",
  measurementId: "G-FNH3L1R21F"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
