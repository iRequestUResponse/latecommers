<template>
  <div id="app">
    <nav>
      <router-link class="home" to="/"><i class="fas fa-home"></i></router-link>
      <router-link class="login" to="/login" v-if="!currentUser">Login</router-link>
      <router-link class="management" to="/management" v-if="currentUser">Management</router-link>
      <router-link class="logout" to="/" @click.native="logout" v-if="currentUser">Logout</router-link>
    </nav>
    <div class="back">

    </div>
    <router-view/>
  </div>
</template>

<style>
@charset 'utf-8';

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');

@import url('./assets/fontawesome-free-5.9.0-web/css/all.min.css');

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #FFF;
  margin: 0;
  text-align: right;
  vertical-align: middle;
}

.back {
  height: 256px;
  margin: 0;
  background: url('./assets/back.jpg');
  background-attachment: fixed;
  background-size: 100%;
  margin-top: 64px;
}

a {
  /* background-color: #FFF; */
  /* margin: 1em; */
  /* padding: 0.5em; */
  text-decoration: none;
  color: #000;
  font-size: 24px;
}

a:hover {
  color: rgb(94, 113, 141);
}

.home {
  position: fixed;
  left: 0;
  top: 0;
  font-size: 32px;
  padding: 0;
  margin: 0.25em;
}

.logout {
  margin-left: 2em;
}

.management,
.logout {
  display: inline-block;
  background-color: rgb(240, 241, 243);
  /* border-radius: 16px; */
  padding: 0.5em;
  height: 100%;
  box-sizing: border-box;
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
