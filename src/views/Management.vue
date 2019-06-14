<template>
  <div v-if="currentUser">

    <button @click="function() { tab = 0 }">학생 관리</button>
    <button @click="function() { tab = 1 }">지각 관리</button>
    <comp-student v-show="tab === 0"></comp-student>
    <comp-late v-show="tab === 1"></comp-late>
  </div>
</template>

<script>
  import router from '@/router'
  import { mapState } from 'vuex'
  import firebase from 'firebase'

  import compStudent from '@/components/Students.vue'
  import compLate from '@/components/Lates.vue'

  export default {
    data() {
      return {
        tab: 0
      }
    },
    computed: {
      ...mapState([
        'currentUser', 'database'
      ])
    },
    methods: {
    },
    mounted() {
      if (!this.currentUser) {
        router.push('/')
      }
    },
    components: {
      compStudent, compLate
    }
  }
</script>

<style scoped>
  .header {
    font-weight: bold;
  }
</style>