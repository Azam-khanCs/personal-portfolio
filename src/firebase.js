import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcFk3t4JeD5hezpwsUKMEu5q7XhYOOoI4",
  authDomain: "azam-portfolio-c3b01.firebaseapp.com",
  projectId: "azam-portfolio-c3b01",
  storageBucket: "azam-portfolio-c3b01.firebasestorage.app",
  messagingSenderId: "936088544988",
  appId: "1:936088544988:web:619ad8b1c0dd7715a17619",
  measurementId: "G-KKB6C1S736",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const initFirebaseAnalytics = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const supported = await isSupported();
  return supported ? getAnalytics(firebaseApp) : null;
};
