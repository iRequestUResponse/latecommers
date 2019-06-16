<template>
  <div>
    <div class="total">
      <span class="paid">
        총 벌칙금 : {{ (total.paid * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/, ',') }}원
      </span>
      <br>
      <span class="unpaid">
        총 미납금 : {{ ((total.count - total.paid) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/, ',') }}원
      </span>
    </div>
    <div class="title">
      <span>[[ 지각자 ]]</span>
    </div>
    <div class="later" v-for="(later, laterIndex) in laterList" :key="laterIndex">
      {{ later.name }}
      {{ later.paid }} / {{ later.count }} ==> 미납 : {{ later.count - later.paid }}
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    computed: {
      ...mapState([
        'database'
      ]),
      laterList() {
        const arr = []
        // const arr = this.database.students
        const db = this.database

        for (const e of db.lates) {
          const findMe = arr.find(v => v.id === e.student)

          if (findMe) {
            const index = arr.indexOf(findMe)
            arr[index].count++
          } else {
            arr.push({
              id: e.student,
              count: 1
            })
          }
        }

        for (const e of db.students) {
          const findMe = arr.find(v => v.id === e.id)

          if (findMe) {
            arr[arr.indexOf(findMe)].paid = e.paid
            arr[arr.indexOf(findMe)].name = e.name
          }
        }

        return arr
      },
      total() {
        const result = {
          paid: 0,
          count: 0
        }
        for (const e of this.laterList) { // It can be spaghetti source
          result.paid += e.paid
          result.count += e.count
        }

        return result
      }
    },
    methods: {
      getStudent(id) {
        return this.database.students.find(e => e.id === id)
      }
    },
  }
</script>

<style scoped>

</style>