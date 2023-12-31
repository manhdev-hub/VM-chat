import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator  } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";
import {connectStorageEmulator, getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB80E2hn6auNm7rcCNKElD5ONZCpmE3HfM",
    authDomain: "vm-chat-73d58.firebaseapp.com",
    projectId: "vm-chat-73d58",
    storageBucket: "vm-chat-73d58.appspot.com",
    messagingSenderId: "101328582125",
    appId: "1:101328582125:web:483f4f6bdecb8d33e663e4",
    measurementId: "G-ELZ555YEK7"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// if(window.location.hostname === "localhost"){
//   connectFirestoreEmulator(db, '127.0.0.1', 8080);
//   connectStorageEmulator(storage, "127.0.0.1", 9199);
// }
const fbProvider = new FacebookAuthProvider();

export {db, auth, fbProvider, storage}
