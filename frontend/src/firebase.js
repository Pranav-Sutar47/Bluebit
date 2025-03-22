import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_APIKEY),
  authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGINGSENDERID),
  appId: String(import.meta.env.VITE_APPID),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
