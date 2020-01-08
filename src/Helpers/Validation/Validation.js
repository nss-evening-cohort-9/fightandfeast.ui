/* eslint-disable max-len */
import firebase from 'firebase';
import axios from 'axios';

const baseUrl = 'https://localhost:44347/api';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (err) => Promise.reject(err));

const registerUser = (user) => firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((cred) => {
  const userInfo = { email: cred.user.email };

  cred.user.getIdToken()
    .then((token) => sessionStorage.setItem('token', token))
    .then(() => axios.post(`${baseUrl}/users`, userInfo));
});

const loginUser = (user) => firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
  const userInfo = { email: cred.user.email };
  cred.user.getIdToken()
    .then((token) => sessionStorage.setItem('token', token))
    .then(() => axios.get(`${baseUrl}/users/${userInfo.email}.json`));
});

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default {
  getUid,
  loginUser,
  logoutUser,
  registerUser,
};
