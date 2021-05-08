import firebase from "firebase/app";


var config = {
    apiKey: "AIzaSyCVxn6WGH6xQjS93jOOvkyL-KCp8VKNa30",
    authDomain: "tcc-themyscira.firebaseapp.com",
    projectId: "tcc-themyscira",
    storageBucket: "tcc-themyscira.appspot.com",
    messagingSenderId: "263716876212",
    appId: "1:263716876212:web:c09a9329f688ab6136cce1",
    measurementId: "G-S6T02R542X",
    databaseURL: "https://tcc-themyscira-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

console.log(database);