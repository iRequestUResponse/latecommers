<template>
  <div @mousedown="touch" @mouseup="takeOff">
    {{ mousePos }}
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        date: new Date(),
        mousePos: null
      }
    },
    computed: {
      ...mapState([
        'database'
      ])
    },
    methods: {
      touch(event) {
        this.mousePos = {
          x: event.x,
          y: event.y,
          state: 'touch'
        }
      },
      takeOff(event) {
        const endPos = {
          x: event.x,
          y: event.y,
          state: 'takeoff'
        }

        
      },
    }
  }
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>