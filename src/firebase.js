// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc,deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBJjPGN8wpjcwDIE70eRT0slduAFwpgQe4",

  authDomain: "personal-finance-tracker-1fea0.firebaseapp.com",

  projectId: "personal-finance-tracker-1fea0",

  storageBucket: "personal-finance-tracker-1fea0.appspot.com",

  messagingSenderId: "704469301671",

  appId: "1:704469301671:web:f3b9256a5e8408eedc1e82"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth,analytics, provider, doc, getDoc,deleteDoc};
