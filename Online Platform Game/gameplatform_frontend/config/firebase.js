// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDNZlJvBQQ3VVb3vptRxJbKCT7RcveSmGE',
  authDomain: 'belajar-firebase-b18d7.firebaseapp.com',
  projectId: 'belajar-firebase-b18d7',
  storageBucket: 'belajar-firebase-b18d7.appspot.com',
  messagingSenderId: '99282932025',
  appId: '1:99282932025:web:de8966e475e376062718e8',
  measurementId: 'G-36HVE15BJD',
};

// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
// const appFirebase = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const firebaseAuthentication = appFirebase.auth();
