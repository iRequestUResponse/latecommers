import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
// import * as firebaseui from 'firebaseui'

Vue.use(Vuex)

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyC8q1VoE4EBlUUOrkmCRgfoonbiJWWB-ak",
  authDomain: "late-comers.firebaseapp.com",
  databaseURL: "https://late-comers.firebaseio.com",
  storageBucket: "late-comers.appspot.com",
};

firebase.initializeApp(config);


export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
})