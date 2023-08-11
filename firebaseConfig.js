// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZyK3rFdGFzo-4kM6F8FA_4JtoN-hwQ6o",
  authDomain: "fir-todo-55b26.firebaseapp.com",
  projectId: "fir-todo-55b26",
  storageBucket: "fir-todo-55b26.appspot.com",
  messagingSenderId: "39480836384",
  appId: "1:39480836384:web:bdc4a69ad6ef314ba29745",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
