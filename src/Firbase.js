
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const analytics = getAnalytics(app);

// console.log(process.env.REACT_APP_FIREBASE_KEY,"apiiiiiiiiiiiiiiiiiiiiii");
const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_KEY,

  authDomain: "contactsratannagarreact.firebaseapp.com",

  projectId: "contactsratannagarreact",

  storageBucket: "contactsratannagarreact.appspot.com",

  messagingSenderId: "473319059360",

  appId: "1:473319059360:web:dafd49551ccccafb183ec5",

  measurementId: "G-13G522D3ES"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



 