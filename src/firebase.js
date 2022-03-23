// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzTQQ5T2iDxX5uwONPd-hgVmdjYU-UF70",
  authDomain: "realtime-chat-auth.firebaseapp.com",
  projectId: "realtime-chat-auth",
  storageBucket: "realtime-chat-auth.appspot.com",
  messagingSenderId: "821887062811",
  appId: "1:821887062811:web:dc00aa30182798b249b9be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
export const emailProvider = new EmailAuthProvider();

export const db = getFirestore(firebaseApp);