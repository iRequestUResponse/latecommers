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

const store = new Vuex.Store({
  state: {
    ui: new firebaseui.auth.AuthUI(firebase.auth()),
    currentUser: firebase.auth().currentUser,
    test: 0
  },
  mutations: {
    test(state, payload) {
      state.test = payload;
    },
    login(state, payload) {
      state.currentUser = payload
    },
    logout(state) {
      state.currentUser = null;
    }
  },
  actions: {
    // init({ commit }) {
    //   firebase.initializeApp({
    //     apiKey: "AIzaSyC8q1VoE4EBlUUOrkmCRgfoonbiJWWB-ak",
    //     authDomain: "late-comers.firebaseapp.com",
    //     databaseURL: "https://late-comers.firebaseio.com",
    //     storageBucket: "late-comers.appspot.com",
    //   })

    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

    //   firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       commit('login', user)
    //     }
    //   })
    // },
    logout({ commit }) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // this.currentUser = firebase.auth().currentUser
        commit('logout')
        console.log('logout')
      }).catch(function(error) {
        // An error happened.
        console.log('failed to logout')
      });
    }
  },
  
})

export default store

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit('login', user)
  }
});