<template>
  <div v-if="currentUser">
    management test
  </div>
</template>

<script>
  import store from '@/store'
  import firebase from 'firebase'
  
  export default {
    data(){
      return {

      }
    },
    computed: {
      currentUser() {
        return store.state.currentUser
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>