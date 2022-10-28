// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtqZIhOZK9bUFwdNApRImAjqEStkBRrdo",
  authDomain: "to-do-list-8ae56.firebaseapp.com",
  projectId: "to-do-list-8ae56",
  storageBucket: "to-do-list-8ae56.appspot.com",
  messagingSenderId: "924863191365",
  appId: "1:924863191365:web:647db999ffb633df80c62c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore
const projectFirestore = firebase.firestore()
export { projectFirestore }