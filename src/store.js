import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ui: null,
    currentUser: null,
    database: {
      students: [],
      lates: [],
      penalty: 1000,
    },
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
    update(state, payload) {
      state.database = { ...state.database, ...payload }
    },
    updateStudentPaidMutation(state, {id, paid}) {
      for (const i in state.database.students) {
        if (state.database.students[i].id === id) {
          state.database.students[i].paid = paid
          break;
        }
      }
      firebase.database().ref('/jaehoon').update(state.database).catch(e => {
        console.log('login please')
      })
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
      
      firebase.database().ref('/jaehoon').on('value', function(snapshot) {
        commit('update', snapshot.val())
      })
      
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          commit('login', user)
        }
      })

      this.commit('initUI')
    },
    logout({ commit }) {
      firebase.auth().signOut().then(function() {
        commit('logout')
      }).catch(function(error) {
        console.log('failed to logout')
      })
    },
    updateStudentPaid({ commit }, {id, paid}) {
      commit('updateStudentPaidMutation', {id, paid})
    }
  },
})