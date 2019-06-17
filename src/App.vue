<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!currentUser">Login</router-link>
      <router-link to="/management" v-if="currentUser">Management</router-link>
      <router-link to="/" @click.native="logout" v-if="currentUser">Logout</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@charset 'utf-8';

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');

* {
  font-family: 'Noto Sans KR', sans-serif;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  height: 128px;
  background-color: grey;
  margin: 0;
  background: url('./assets/back.jpg');
  background-attachment: fixed;
  background-size: cover;
}

a {
  background-color: #FFF;
  margin: 1em;
  padding: 0.5em;

}
</style>

<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'currentUser'
    ]),
  },
  methods: {
    ...mapActions([
      'init', 'logout'
    ]),
  },
  created() {
    this.init()
  }
}
</script>
