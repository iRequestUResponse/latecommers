<template>
  <div>
    {{ date }}
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        date: new Date()
      }
    },
    computed: {
      ...mapState([
        'database'
      ])
    }
  }
</script>

<style scoped>

</style>