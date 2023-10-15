// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaXeEsYlxwJMI3Ww0GEcXcDC6YOVFFjUM",
  authDomain: "eatreal-bfa80.firebaseapp.com",
  projectId: "eatreal-bfa80",
  storageBucket: "eatreal-bfa80.appspot.com",
  messagingSenderId: "375739511176",
  appId: "1:375739511176:web:67c3d26d553fd551b78a3d"
};

const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();

const db = getFirestore(firebase_app);

export {auth, provider, db}