import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoHO2YZuwBbOit1cb__dFoiuVRp8xSITw",
  authDomain: "blogging-enidev911.firebaseapp.com",
  projectId: "blogging-enidev911",
  storageBucket: "blogging-enidev911.appspot.com",
  messagingSenderId: "509819174397",
  appId: "1:509819174397:web:d12b8b3b1d082a5672ed94",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

let db = firebase.firestore();
