// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwI_3tKnoqWTSVeyImNeyGyzB89PiqeYI",
  authDomain: "chatapp-f64e6.firebaseapp.com",
  projectId: "chatapp-f64e6",
  storageBucket: "chatapp-f64e6.appspot.com",
  messagingSenderId: "93112530229",
  appId: "1:93112530229:web:225752468a2d6ad501487c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
