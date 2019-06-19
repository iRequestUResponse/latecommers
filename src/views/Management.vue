<template>
  <div v-if="currentUser">

    <i class="fas fa-clock" @click="function() { tab = 0 }"></i>
    <i class="fas fa-users" @click="function() { tab = 1 }"></i>
    <comp-late v-show="tab === 0"></comp-late>
    <comp-student v-show="tab === 1"></comp-student>
  </div>
</template>

<script>
  import router from '@/router'
  import { mapState } from 'vuex'

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
        'currentUser'
      ])
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

  i {
    font-size: 48px;
    margin: 16px 24px;
  }

  i:hover {
    color: #5c7aa5;
  }
</style>