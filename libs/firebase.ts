// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfuyLMCsB6-gxUexxfszKzHwDYUPNuDk",
  authDomain: "eco-shop-diplom.firebaseapp.com",
  projectId: "eco-shop-diplom",
  storageBucket: "eco-shop-diplom.appspot.com",
  messagingSenderId: "138693425979",
  appId: "1:138693425979:web:e048142a5ad9bba455951e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp