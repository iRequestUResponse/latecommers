<template>
  <div v-if="currentUser">
    <div class="header">학생 관리</div>

    <comp-student></comp-student>
    {{ database }}
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
        'currentUser', 'database'
      ])
    },
    methods: {
      /* 
      사용할 store 메서드(actions) : store에 정의하자
      - 
      */
      ...mapMutations([
        'update'
      ]),
    },
    mounted() {
      if (!this.currentUser) {
        router.push('/')
      }
    },
    components: {
      'comp-student': () => import('@/components/Students.vue')
    }
  }
</script>

<style scoped>
  .header {
    font-weight: bold;
  }
</style>