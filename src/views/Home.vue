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
            <th :class="{isUnpaid: total.count > total.paid}">
              미납
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="later" v-for="(later) in unpaidLaters" :key="later.id">
            <td class="name">
              {{ later.name }}
            </td>
            <td class="count">
              {{ later.count }}
            </td>
            <td class="paid">
              <i class="fas fa-minus-circle plusMinus" :data-later="JSON.stringify(later)" @click="minus" v-if="currentUser"></i> {{ later.paid }} <i class="fas fa-plus-circle plusMinus" :data-later="JSON.stringify(later)" @click="plus" v-if="currentUser"></i>
            </td>
            <td :class="{unpaid: true, isUnpaid: later.count > later.paid}">
              {{ later.count - later.paid }}
            </td>
          </tr>
          <tr class="later" v-for="(later) in paidLaters" :key="later.id">
            <td class="name">
              {{ later.name }}
            </td>
            <td class="count">
              {{ later.count }}
            </td>
            <td class="paid">
              <i class="fas fa-minus-circle plusMinus" :data-later="JSON.stringify(later)" @click="minus" v-if="currentUser"></i> {{ later.paid }} <i class="fas fa-plus-circle plusMinus" :data-later="JSON.stringify(later)" @click="plus" v-if="currentUser"></i>
            </td>
            <td :class="{unpaid: true, isUnpaid: later.count > later.paid}">
              {{ later.count - later.paid }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    computed: {
      ...mapState([
        'database', 'currentUser'
      ]),
      paidLaters() {
        return this.laterList.filter(e => e.count <= e.paid)
      },
      unpaidLaters() {
        return this.laterList.filter(e => e.count > e.paid)
      },
      laterList() {
        const arr = []
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
        for (const e of this.laterList) {
          result.paid += e.paid
          result.count += e.count
        }

        return result
      }
    },
    methods: {
      ...mapActions([
        'updateStudentPaid'
      ]),
      getStudent(id) {
        return this.database.students.find(e => e.id === id)
      },
      minus(event) {
        const target = event.target
        const later = JSON.parse(target.dataset.later)
        const id = later.id
        const paid = later.paid - 1
        this.updateStudentPaid({id, paid})
      },
      plus(event) {
        const target = event.target
        const later = JSON.parse(target.dataset.later)
        const id = later.id
        const paid = later.paid + 1
        this.updateStudentPaid({id, paid})
      },
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

tr {
  height: 96px;
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

.isUnpaid {
  color: crimson;
}

.plusMinus {
  margin: 0 12px;
  font-size: 32px;
}

.fa-plus-circle {
  color: #436694;
}

.fa-plus-circle:hover {
  color: #344761;
}

.fa-minus-circle {
  color: #944343;
}

.fa-minus-circle:hover {
  color: #613434;
}
</style>