import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCyBsehgigN7i5Ur15rKDxWScm7iaSpN3k",
    authDomain: "yazan-portfolio.firebaseapp.com",
    databaseURL: "https://yazan-portfolio.firebaseio.com",
    projectId: "yazan-portfolio",
    storageBucket: "yazan-portfolio.appspot.com",
    messagingSenderId: "609539689356",
    appId: "1:609539689356:web:d6d2c8264eb18135b164a9",
    measurementId: "G-GBJ4BGP25G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default {
  db: firebaseApp.firestore(),
  storage: firebaseApp.storage().ref()
};