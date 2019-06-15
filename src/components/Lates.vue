<template>
  <div>
    {{ database.lates }}
    <br>
    <br>
    {{ currentMonthLaters }}
    <div>
      <button @click="monthMinus">&lt;</button><span>{{ currentMonth.year }}년 {{ currentMonth.month + 1 }} 월</span><button @click="monthPlus">&gt;</button>
    </div>
    <div class="th" v-for="(student, index) in database.students" :key="index" @mousedown="touch" @mousemove="swipe" @mouseup="takeOff">
      <span class="name">{{ student.name }}</span>
      <div class="lates">
        <span
          class="late"
          v-for="(late, lateIndex) in dates"
          :key="lateIndex"
          @click="viewIndex"
        >
        
          <!-- {{ late }} -->
          {{ lateIndex+1 }}
          <!-- :data-studentId="late[index].id" -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        date: new Date(),
        mousePos: {
          state: 'takeOff'
        },
        currentMonth: {
          year: new Date().getFullYear(),
          month: new Date().getMonth()
        },
      }
    },
    computed: {
      ...mapState([
        'database'
      ]),
      beginDate() {
        return new Date(this.database.beginDate)
      },
      endDate() {
        return new Date(this.database.endDate)
      },
      currentMonthLaters() {
        return this.database.lates.filter(e => 
          +e.year === +this.currentMonth.year
          &&
          +e.month === +this.currentMonth.month
        )
      },
      dates() {
        return new Array(this.daysOfMonth)
        .fill(1)
      },
      // dates() {
      //   return new Array((this.endDate - this.beginDate) / 86400000)
      //   .fill(JSON.parse(JSON.stringify(this.database.students)))
      // },
      daysOfMonth() {
        return new Date(this.currentMonth.year, this.currentMonth.month+1, 0).getDate()
      }
    },
    methods: {
      monthMinus() {
        this.currentMonth.month--
        if (this.currentMonth.month < 0) {
          this.currentMonth.month = 11
          this.currentMonth.year--
        }
      },
      monthPlus() {
        this.currentMonth.month++
        if (this.currentMonth.month > 11) {
          this.currentMonth.month = 0
          this.currentMonth.year++
        }
      },
      touch(event) {
        this.mousePos = {
          x: event.x,
          y: event.y,
          state: 'touch'
        }
      },
      takeOff(event) {
        this.mousePos = {
          x: event.x,
          y: event.y,
          state: 'takeoff'
        }

        console.log('takeOff')
      },
      swipe(event) {
        const endPos = {
          x: event.x,
          y: event.y,
        }

        if (this.mousePos.state === 'touch') {
          document.querySelectorAll('.lates').forEach(v => {
            v.scrollTo(v.scrollLeft + (this.mousePos.x - endPos.x) / 10, v.scrollTop)
          })
          console.log(this.mousePos.state)
        }
      },
      viewIndex(event) {
        console.log(event.target.dataset.studentid)
      }
    }
  }
</script>

<style scoped>
* {
  user-select: none;
}

div {
  width: 100%;
  height: 100%;
}

.late {
  display: inline-block;
  width: 2em;
  height: 2em;
  background-color: antiquewhite;
  margin: 0.1em;
}

.lates {
  display: inline-block;
  width: 80%;
  overflow-x: hidden;
  white-space: nowrap;
}
</style>