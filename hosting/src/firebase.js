import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD79aeAo9-T0KhufQh4E-_yhoWuLDFfz8g",
  authDomain: "split-it-40312.firebaseapp.com",
  projectId: "split-it-40312",
  storageBucket: "split-it-40312.appspot.com",
  messagingSenderId: "511012206927",
  appId: "1:511012206927:web:69b49b6ed3a8b15b97ad3a",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
