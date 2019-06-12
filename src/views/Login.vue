<template>
  <div class='login'>
    Hello world! this is login test;
    <div id="firebaseui-auth-container">
      Hello world!
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'ui'
      ])
    },
    mounted() {
      this.begin();
    },
    methods: {
      ...mapMutations([
        'login'
      ]),
      begin() {
        const const_this = this;
        const uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult(authResult, redirectUrl) {
              const_this.login(firebase.auth().currentUser)
              return false; // redirect?
            },
          },
          signInSuccessUrl: '/home',
          signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
        }

        this.ui.start('#firebaseui-auth-container', uiConfig);
      }
    }
  }
</script>

<style scoped>
@import url(../../node_modules/firebaseui/dist/firebaseui.css);
/* @import url(https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css); */

</style>