// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyClkMteslfZp1HPUXkwUFJseXqmhNtZDFs',
  authDomain: 'job-search-app-792f1.firebaseapp.com',
  projectId: 'job-search-app-792f1',
  storageBucket: 'job-search-app-792f1.appspot.com',
  messagingSenderId: '625286252502',
  appId: '1:625286252502:web:5f75e9b0b66cf8e035c677',
  measurementId: 'G-NKFT9R1DVM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db