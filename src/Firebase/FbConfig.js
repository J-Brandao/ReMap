import firebase from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBX_iNqk8CaZxDdEof02LH4Fut5vO-Zbps",
    authDomain: "trabalho-final-tdi.firebaseapp.com",
    projectId: "trabalho-final-tdi",
    storageBucket: "trabalho-final-tdi.appspot.com",
    messagingSenderId: "1097388938547",
    appId: "1:1097388938547:web:ef1f615b4cda6ea3729a46"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default}