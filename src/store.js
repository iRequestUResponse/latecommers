import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

Vue.use(Vuex)

firebase.initializeApp({
  apiKey: "AIzaSyC8q1VoE4EBlUUOrkmCRgfoonbiJWWB-ak",
  authDomain: "late-comers.firebaseapp.com",
  databaseURL: "https://late-comers.firebaseio.com",
  storageBucket: "late-comers.appspot.com",
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
.then(function() {
  // Existing and future Auth states are now persisted in the current
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch(function(error) {
  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
});

export default new Vuex.Store({
  state: {
    ui: new firebaseui.auth.AuthUI(firebase.auth()),
    currentUser: null
  },
  mutations: {

  },
  actions: {

  },
})