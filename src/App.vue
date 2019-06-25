<template>
  <div id="app">
    <nav>
      <a :href="'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(database))" :download="currentUser.email + '.json'" v-if="currentUser"><i class="fas fa-download"></i></a>
      <router-link class="home" to="/"><i class="fas fa-home"></i></router-link>
      <router-link class="login" to="/login" v-if="!currentUser"><i class="fas fa-sign-in-alt"></i></router-link>
      <router-link class="management" to="/management" v-if="currentUser"><i class="fas fa-tasks"></i></router-link>
      <router-link class="logout" to="/" @click.native="logout" v-if="currentUser"><i class="fas fa-sign-out-alt"></i></router-link>
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
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
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
}

a {
  text-decoration: none;
  color: #000;
  font-size: 24px;
  margin-left: 1em;
}

a:hover {
  color: rgb(94, 113, 141);
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'currentUser', 'database'
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
