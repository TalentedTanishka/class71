import * as firebase from 'firebase' 
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAMx9GuzT2kyJdYkeJSLzaKpNjeOS3FioM",
    authDomain: "library-a078f.firebaseapp.com",
    projectId: "library-a078f",
    storageBucket: "library-a078f.appspot.com",
    messagingSenderId: "939332733931",
    appId: "1:939332733931:web:16ea7ad2b2aea94166e7ae"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();