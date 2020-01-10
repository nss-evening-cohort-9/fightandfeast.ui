import firebase from 'firebase/app';
import firebaseConfig from './firebaseApiKeys.json';

const firebaseAuthentication = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseConfig);
  }
};

export default firebaseAuthentication;
