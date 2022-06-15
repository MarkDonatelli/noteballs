import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/js/firebase';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');
        } else {
          this.user = {};
          this.router.replace('/auth');
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('logged out user');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});
