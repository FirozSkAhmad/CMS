import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDRJxQs0ngSx_Bz296N6LQDkLQJwHr4WSg",
  authDomain: "cms-backend-93edb.firebaseapp.com",
  projectId: "cms-backend-93edb",
  storageBucket: "cms-backend-93edb.appspot.com",
  messagingSenderId: "632882382235",
  appId: "1:632882382235:web:683d89dde7eadc88724d3e",
  measurementId: "G-N9VBL34KYM"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage };
