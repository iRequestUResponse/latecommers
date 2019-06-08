<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-link to="/">Home</router-link>
    <router-link to="/login" v-if="!currentUser">Login</router-link>
    <button @click="logout">Logout</button>
    <button @click="test">test</button>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import store from '@/store'
import firebase from 'firebase'

export default {
  data() {
    return {
      currentUser: firebase.auth().currentUser
    }
  },
  computed: {
    // currentUser = store.state.currentUser
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // this.currentUser = firebase.auth().currentUser
      }).catch(function(error) {
        // An error happened.
      });
    },
    test() {
      console.log(store.state.currentUser)
    }
  }
}
</script>
