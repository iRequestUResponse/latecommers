<template>
  <div class='login'>
    Hello world! this is login test;
    <div id="firebaseui-auth-container">
      Hello world!
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'

  export default {
    mounted() {
      this.begin();
    },
    methods: {
      begin() {
        var uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult(authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              store.commit('login', firebase.auth().currentUser)
              // console.log(store.state.login, store.state.test)
              // console.log(firebase.auth().currentUser)
              return false;
            },
            // uiShown() {
            //   // The widget is rendered.
            //   // Hide the loader.
            //   document.getElementById('loader').style.display = 'none';
            // }
          },
          signInSuccessUrl: '/home',
          signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
        }

        store.state.ui.start('#firebaseui-auth-container', uiConfig);
      }
    }
  }
</script>

<style scoped>
@import url(../../node_modules/firebaseui/dist/firebaseui.css);
/* @import url(https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css); */

</style>