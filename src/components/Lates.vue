<template>
  <div id="touchMover">
    <div class="dateSelector">
      <button @click="monthMinus">&lt;</button><span>{{ cDate.getFullYear() }}년 {{ cDate.getMonth() + 1 }} 월</span><button @click="monthPlus">&gt;</button>
    </div>
    <div class="calendar">
      <div v-for="(calRow, calIndex) in getCalendar" :key="calIndex">
        <span
          v-for="(date, dateIndex) in calRow" :key="dateIndex"
          :class="{date: true, cMonth: date.month === cDate.getMonth()}"
          :data-info="JSON.stringify(date)"
          @click="modalPopup"
        >
        <!-- span class에 미납자 여부에 따라서 색 다르게 하자 -->
          {{ date.date }}
          <div class="latersNumber" v-if="date.laters.length > 0">
            {{ date.laters.length }}
          </div>
        </span>
      </div>
    </div>
    <modal :show="modalShow" :laters="laters" @hide="modalShow = false"></modal>
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
        cDate: new Date(),
        modalShow: false,
        laters: "{}",
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
      getCalendar() {
        const _cDay = new Date(this.cDate.getFullYear(), this.cDate.getMonth(), 1).getDay()
        
        const prevMonth = new Date(this.cDate.getFullYear(), this.cDate.getMonth(), 0)

        let arr = new Array(_cDay)
        .fill({})
        .map((e, i) => {
          return {
            year: prevMonth.getFullYear(),
            month: prevMonth.getMonth(),
            date: prevMonth.getDate() - _cDay + i + 1,
            day: i,
            laters: []
          }
        })

        arr = arr.concat(new Array(this.daysOfMonth)
        .fill(1)
        .map((e, i) => {
          return {
            year: this.cDate.getFullYear(),
            month: this.cDate.getMonth(),
            date: i + 1,
            day: (i + _cDay) % 7,
            laters: []
          }
        }))

        const nextMonth = new Date(this.cDate.getFullYear(), this.cDate.getMonth() + 1, 1)
        const lastDay = new Date(nextMonth)
        lastDay.setDate(0)

        arr = arr.concat(...new Array(6 - lastDay.getDay()).fill(1).map((e, i) => {
          return {
            year: nextMonth.getFullYear(),
            month: nextMonth.getMonth(),
            date: i + 1,
            day: (i + nextMonth.getDay()) % 7,
            laters: []
          }
        }))

        for (const e of this.database.lates) {
          const _calendarDate = arr.filter(v => 
            v.year === e.year
            &&
            v.month === e.month
            &&
            v.date === e.date
          )

          for (const i in _calendarDate) {
            _calendarDate[i].laters.push(e.student)
          }
        }

        const row = Math.ceil(arr.length / 7)
        const result = new Array(row).fill([])
        for (const i in result) {
          result[i] = arr.slice(i * 7, i * 7 + 7)
        }

        return result
      },
      daysOfMonth() {
        return new Date(this.cDate.getFullYear(), this.cDate.getMonth()+1, 0).getDate()
      }
    },
    methods: {
      monthMinus() {
        const changeDate = new Date(this.cDate)
        changeDate.setMonth(this.cDate.getMonth() - 1)
        this.cDate = changeDate
      },
      monthPlus() {
        const changeDate = new Date(this.cDate)
        changeDate.setMonth(this.cDate.getMonth() + 1)
        this.cDate = changeDate
      },
      modalPopup(event) {
        let _t = event.target
        if (!_t.classList.contains('date')) {
          _t = _t.parentElement
        }
        this.laters = _t.dataset.info
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

.dateSelector {
  margin: 2em 0;
}

.date {
  display: inline-block;
  width: 48px;
  height: 48px;
  font-size: 1em;
  background-color: antiquewhite;
  background-clip: content-box;
  padding: 4px;
  line-height: 48px;
  vertical-align: middle;
  position: relative;
  color: grey;
}

.date.cMonth {
  font-weight: bold;
  color: #323232;
}

.latersNumber {
  font-size: 0.5em;
  width: 2em;
  height: 1em;
  position: absolute;
  top: .5em;
  right: .5em;
  background-color: #3287FC;
  color: white;
  font-weight: bold;
  line-height: initial;
  padding: 0.5em;
  box-sizing: content-box;
  border-radius: 1em;
}
</style>