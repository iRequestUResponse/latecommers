<template>
  <div id="touchMover">
    <div>
      <button @click="monthMinus">&lt;</button><span>{{ currentMonth.year }}년 {{ currentMonth.month + 1 }} 월</span><button @click="monthPlus">&gt;</button>
    </div>
    <div
      class="th"
      v-for="(student, index) in students"
      :key="index"
    >
      <span class="name">{{ student.name }}</span>
      <div class="lates">
        <span
          class="late"
          v-for="(late, lateIndex) in student.lates"
          :key="lateIndex"
          :data-studentid="student.id"
          :data-date="late"
          @click="viewIndex"
        >
          {{ lateIndex + 1 }}
        </span>
      </div>
    </div>
    <modal :show.sync="modalShow" :student.sync="currentStudent"></modal>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'
  import modal from '@/components/ModalModifyStudent.vue'
  import Hammer from '@/assets/hammer.min.js'

  export default {
    mounted() {
      const hammer = new Hammer(document.querySelector('#touchMover'), {
        thredhold: 0
      })

      hammer.on('pan', function(event) {
        document.querySelectorAll('.lates').forEach(v => {
          v.scrollTo(v.scrollLeft - event.deltaX, v.scrollTop)
        })
      })
    },
    data() {
      return {
        date: new Date(),
        currentMonth: {
          year: new Date().getFullYear(),
          month: new Date().getMonth()
        },
        modalShow: false,
        currentStudent: {},
      }
    },
    computed: {
      ...mapState([
        'database'
      ]),
      students() {
        return this.database.students
        .map(e => {
          return {...e, lates: new Array(this.daysOfMonth).fill({}).map(function() {
              return {
                id: e.id,
                name: e.name,
                late: false,
                paid: false
              }
            })
          }
        })
      },
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
      viewIndex(event) {
        const student = event.target.dataset.studentid
        const date = event.target.dataset.date+1
        this.currentStudent = {
          student,
          date
        }
        this.modalShow = true
      }
    },
    components: {
      modal
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
  line-height: 2em;
}

.lates {
  display: inline-block;
  width: 80%;
  overflow-x: hidden;
  white-space: nowrap;
  vertical-align: middle;
}
</style>