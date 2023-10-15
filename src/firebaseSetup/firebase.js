// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)