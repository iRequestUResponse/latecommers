<template>
  <div v-if="currentUser">
    management test
    {{ currentUser }}
    <input v-model="test">
    <button @click="zxcv">asdf</button>
  </div>
</template>

<script>
  import router from '@/router'
  import { mapState, mapMutations } from 'vuex'
  import firebase from 'firebase'

  const db = firebase.database()
  
  export default {
    data() {
      return {
        test: null
      }
    },
    computed: {
      ...mapState([
        'currentUser', 'students'
      ])
    },
    methods: {
      /* 
      사용할 store 메서드(actions) : store에 정의하자
      - 
      */
      ...mapMutations([
        'testCommit'
      ]),
      zxcv() {
        const const_this = this
        const dummy = {}
        dummy[this.test.split('/')[0]] = this.test.split('/')[1]
        db.ref('/jaehoon/').update({
          ...dummy
        }, function(error) {
          if (error) {
            console.warn('error: ' + eror)
            // this.testCommit(dummy)
          } else {
            console.log('successfully...')
          }
        })
      }
    },
    mounted() {
      if (!this.currentUser) {
        router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>