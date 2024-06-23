import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_K3-XjOxBNK9Jjzt8YE6SaK0BBp_aXfk",
  authDomain: "perfume-store-7f575.firebaseapp.com",
  projectId: "perfume-store-7f575",
  storageBucket: "perfume-store-7f575.appspot.com",
  messagingSenderId: "1013674447043",
  appId: "1:1013674447043:web:3086620273c2c92ab1d276",
  measurementId: "G-XQWS19RZ6P",
};

const firebase_initialize = initializeApp(firebaseConfig);

export default firebase_initialize;
