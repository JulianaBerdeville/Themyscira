import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'


firebase.initializeApp({
  apiKey: "AIzaSyCVxn6WGH6xQjS93jOOvkyL-KCp8VKNa30",
  authDomain: "tcc-themyscira.firebaseapp.com",
  projectId: "tcc-themyscira",
  storageBucket: "tcc-themyscira.appspot.com",
  messagingSenderId: "263716876212",
  appId: "1:263716876212:web:c09a9329f688ab6136cce1",
  measurementId: "G-S6T02R542X",
  databaseURL: "https://tcc-themyscira-default-rtdb.firebaseio.com/",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
