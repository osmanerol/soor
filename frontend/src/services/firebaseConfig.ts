import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb249rSCEQYv2c7NebKKwLQF_IlbROeY0",
  authDomain: "soor-efd07.firebaseapp.com",
  projectId: "soor-efd07",
  storageBucket: "soor-efd07.appspot.com",
  messagingSenderId: "1097054034675",
  appId: "1:1097054034675:web:2690c1cdd3ebfd20fab586",
  measurementId: "G-E8E7STQJTG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
  
export default firestore;