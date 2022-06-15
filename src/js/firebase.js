import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfygrgDA3kXVQVdmbXz6S7HACCdzKBlW0',
  authDomain: 'noteballs-73171.firebaseapp.com',
  projectId: 'noteballs-73171',
  storageBucket: 'noteballs-73171.appspot.com',
  messagingSenderId: '938454592066',
  appId: '1:938454592066:web:d7bf247aef9d30463e5bdb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
