<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-link to="/">Home</router-link>
    <router-link to="/login" v-if="!isLogin">Login</router-link>
    <router-link to="/management" v-if="isLogin">Management</router-link>
    <router-link to="/" @click.native="logout" v-if="isLogin">Logout</router-link>
    <!-- <button @click="test">test</button> -->
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
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      isLogin: false
    }
  },
  computed: {
    ...mapState([
      'currentUser'
    ]),
  },
  watch: {
    currentUser() {
      this.isLogin = !!firebase.auth().currentUser
    }
  },
  methods: {
    ...mapActions([
      'init', 'logout'
    ]),
    test() {
      this.isLogin = !!firebase.auth().currentUser
    }
  },
  created() {
    this.init()
  }
}
</script>
