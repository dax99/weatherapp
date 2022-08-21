import firebase from 'firebase/app';
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBXafH6zx57fwX97-IQwN4zsLSCBXnbaZw",
    authDomain: "weatherappdamjan.firebaseapp.com",
    projectId: "weatherappdamjan",
    storageBucket: "weatherappdamjan.appspot.com",
    messagingSenderId: "306065219776",
    appId: "1:306065219776:web:f9d6f53cc276c2f4898d25"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();