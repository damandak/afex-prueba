import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQIly-2qeQeTX5hqOG5hU_OsxrEOccBuY",
  authDomain: "afex-prueba.firebaseapp.com",
  projectId: "afex-prueba",
  storageBucket: "afex-prueba.appspot.com",
  messagingSenderId: "996291199998",
  appId: "1:996291199998:web:6f86675946fe69618436af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
