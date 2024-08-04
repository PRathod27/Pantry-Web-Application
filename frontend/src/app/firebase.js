// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZsKjI6132n_9f_szn6vbpTjvT0XNwllA",
  authDomain: "pantry-web-app-90da3.firebaseapp.com",
  projectId: "pantry-web-app-90da3",
  storageBucket: "pantry-web-app-90da3.appspot.com",
  messagingSenderId: "720454496868",
  appId: "1:720454496868:web:79306ed4fa4f28542ce571",
  measurementId: "G-X4Q5NDBY0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore};