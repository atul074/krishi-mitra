

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDz_Oaiq49WKJJXLzcp8MSLRTGKG_GyuXU",
  authDomain: "agrochemicals-7971f.firebaseapp.com",
  projectId: "agrochemicals-7971f",
  storageBucket: "agrochemicals-7971f.appspot.com",
  messagingSenderId: "443908858959",
  appId: "1:443908858959:web:c363fa55943e107505363a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth,app }
