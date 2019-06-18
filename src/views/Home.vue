<template>
  <div>
    <div class="total">
      <span class="penalty">
        총 벌칙금 <br>
        {{ (total.count * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/, ',') }}원
      </span>
      <span class="unpaid">
        총 미납금 <br>
        {{ ((total.count - total.paid) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/, ',') }}원
      </span>
    </div>
    <!-- <div class="title">
      지각자 목록
    </div> -->
    <div class="laters">
      <table>
        <thead>
          <tr>
            <th colspan="4" class="title">지각자 목록</th>
          </tr>
          <tr>
            <th>
              이름
            </th>
            <th>
              지각
            </th>
            <th>
              지불
            </th>
            <th>
              미납
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="later" v-for="(later, laterIndex) in laterList" :key="laterIndex">
            <td class="name">
              {{ later.name }}
            </td>
            <td class="count">
              {{ later.count }}
            </td>
            <td class="paid">
              {{ later.paid }}
            </td>
            <td :class="{unpaid: true, on: later.count > later.paid}">
              {{ later.count - later.paid }}
            </td>
          </tr>
        </tbody>
      </table>
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
.total .penalty {
  display: block;
  background-color: #76a5d1;
  color: #eff2f5;
  font-size: 48px;
  padding: 1em;
  margin: 0;
}

.total .unpaid {
  display: block;
  background-color: #d18176;
  color: #eff2f5;
  font-size: 48px;
  padding: 1em;
  margin: 0;
}

table {
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 24px;
  border-collapse: collapse;
}

.title {
  background-color: lightgrey;
  height: 2em;
  font-weight: bold;
  color: #88623f;
  font-size: 48px;
  line-height: 2em;
}

th:not(.title) {
  border-bottom: 2px dashed #bebaba;
}

.laters {
  background-color: #d7e4f8;
}

.later .name {
  font-weight: bold;
}

.later .unpaid {
  font-weight: bold;
}

.later .unpaid.on {
  color: crimson;
}
</style>