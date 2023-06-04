import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDgyKzx38wx_MxYPZBBdxZwq6byNeO58ZE",
  authDomain: "funix-chat.firebaseapp.com",
  projectId: "funix-chat",
  storageBucket: "funix-chat.appspot.com",
  messagingSenderId: "402511139405",
  appId: "1:402511139405:web:0f314e8e15c01fd3a70204",
  measurementId: "G-NJ6RXDYCW3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
export { auth,db };
export default firebase;