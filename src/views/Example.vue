<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
// import * as firebaseui from 'firebaseui'

export default {
  name: 'login',
  components: {
    // HelloWorld
    
  }
}

var uiConfig = {
  signInSuccessUrl: '/about ',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: '/none',
  // Privacy policy url/callback.
  // privacyPolicyUrl: function() {
    //   window.location.assign('/none');
  // },
}

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth())
// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig)

</script>

<style scoped>
/* @import url(../../node_modules/firebaseui/dist/firebaseui.css); */

</style>