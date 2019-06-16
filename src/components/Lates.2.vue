<template>
  <div id="touchMover">
    <div class="dateSelector">
      <button @click="monthMinus">&lt;</button><span>{{ currentMonth.year }}년 {{ currentMonth.month + 1 }} 월</span><button @click="monthPlus">&gt;</button>
    </div>
    <div class="latersList">
      <div class="th">
        <div class="name"
          v-for="(student, index) in students"
          :key="index"
        >{{ student.name }}</div>
      </div>
      <div class="content">
        <div
          class="lates"
          v-for="(student, index) in students"
          :key="index"
        >
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
    </div>
    <modal :show.sync="modalShow" :student.sync="currentStudent" @hide="modalShow = false"></modal>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'
  import modal from '@/components/ModalModifyStudent.vue'
  import Hammer from '@/assets/hammer.min.js'

  export default {
    mounted() {
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
      },
    },
    components: {
      modal
    }
  }
</script>

<style scoped>
* {
  user-select: none;
  box-sizing: border-box;
}

div {
  /* width: 100%; */
  height: 100%;
}

.dateSelector {
  margin: 2em 0;
}

.dateSelector button {
  margin: 0 2em;
}

.latersList {
  text-align: center;
  white-space: nowrap;
}

.content {
  max-width: calc(100% - 4em);
  overflow-x: auto;
  overflow-y: hidden;
  /* vertical-align: middle; */
}

.lates {
  white-space: nowrap;
  /* display: inline-block; */
  max-width: calc(100% - 4em);
}

.late {
  display: inline-block;
  width: 2em;
  height: 2em;
  background-color: antiquewhite;
  padding: 0.1em;
  line-height: 2em;
  background-clip: content-box;
}

.latersList > div {
  vertical-align: top;
  display: inline-block;
}

.th {
  /* width: 4em; */
}

.th .name {
  /* display: block; */
  height: 2em;
  padding: 0.1em;
}
</style>