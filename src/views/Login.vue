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
    created() {
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
              store.state.currentUser = firebase.auth().currentUser
              alert("success!")
              return true;
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
        console.log(document.querySelector('#firebaseui-auth-container'))
      }
    }
  }
</script>

<style scoped>
@import url(../../node_modules/firebaseui/dist/firebaseui.css);
/* @import url(https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css); */

</style>