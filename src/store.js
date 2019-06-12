import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ui: null,
    currentUser: null,
    students: null,
    penalties: null,
  },
  mutations: {
    // test(state, payload) {
    //   state.test = payload;
    // },
    login(state, payload) {
      state.currentUser = payload
    },
    logout(state) {
      state.currentUser = null;
    },
    initUI(state) {
      state.ui = new firebaseui.auth.AuthUI(firebase.auth())
    },
    testCommit(state, payload) {
      console.log('success', payload)
      state.students = payload
    }
  },
  actions: {
    init({ commit }) {
      if (this.state.ui) return
      firebase.initializeApp({
        apiKey: "AIzaSyC8q1VoE4EBlUUOrkmCRgfoonbiJWWB-ak",
        authDomain: "late-comers.firebaseapp.com",
        databaseURL: "https://late-comers.firebaseio.com",
        storageBucket: "late-comers.appspot.com",
      })

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          commit('login', user)
          // 기타 init
        }
      })

      if (!this.state.ui) this.commit('initUI')
    },
    logout({ commit }) {
      firebase.auth().signOut().then(function() {
        commit('logout')
      }).catch(function(error) {
        console.log('failed to logout')
        console.warn(error)
      })
    },
  },
  
})