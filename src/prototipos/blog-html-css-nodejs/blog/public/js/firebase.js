import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoHO2YZuwBbOit1cb__dFoiuVRp8xSITw",
  authDomain: "blogging-enidev911.firebaseapp.com",
  projectId: "blogging-enidev911",
  storageBucket: "blogging-enidev911.appspot.com",
  messagingSenderId: "509819174397",
  appId: "1:509819174397:web:d12b8b3b1d082a5672ed94",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
