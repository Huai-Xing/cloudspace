/* jshint esversion: 6 */
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeqxJVbHwkVqfvqn6FEPFBgT8HMmIwdAY",
  authDomain: "teaminfinity-cloudspace.firebaseapp.com",
  projectId: "teaminfinity-cloudspace",
  storageBucket: "teaminfinity-cloudspace.appspot.com",
  messagingSenderId: "806467663575",
  appId: "1:806467663575:web:55b6b2667160b53ad4a292",
  measurementId: "G-9N4QDMGR64",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//var database = firebase.firestore();
export default firebase;
