// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvLAKV1JS7AL7FR-10Na7aVGmdPG0NkX4",
  authDomain: "spurs-banter-app.firebaseapp.com",
  projectId: "spurs-banter-app",
  storageBucket: "spurs-banter-app.firebasestorage.app",
  messagingSenderId: "724060192467",
  appId: "1:724060192467:web:6ef39ba702a1906a6a1e26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore + Auth Instances
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
