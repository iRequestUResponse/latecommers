<template>
  <div>
    <h1>학생 관리</h1>
    <span class="warn">학생 이름이 겹치면 헷갈릴 수 있으니 주의해주세요</span> <br>
    <span class="warn">이 곳에서 금액 수정은 꼭 필요한 경우에만 해주세요</span>

    <ul>
      <li v-for="(student, index) in database.students" :key="index">
        <input type="hidden" class="index" :value="index">
        <span class="studentId" v-show="false">{{ student.id }}</span>
        <input type="text" class="name" v-model="student.name">
        <input type="number" class="paid" v-model.number="student.paid">
        <span>회 지불</span>
        <button class="modify" @click="updateStudent">수정</button>
        <button class="delete" @click="deleteStudent">삭제</button>
        <span class="lateResult">
          <span>지각 </span><span class="late">{{ lateNumberList[index] }}</span><span>회 / </span>
        </span>
        <span class="penaltyResult">
          <span>미납금 </span><span :class="{unpaid:true, warn:unpaidList[index] > 0}">{{ unpaidList[index] }}</span><span>원</span>
        </span>
      </li>
    </ul>
    <span>총 학생 수 : {{ database.students.length }} 명</span>
    <br>
    <input type="text" v-model="addingStudent.name"> <button @click="addStudent">학생 추가</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import firebase from 'firebase'

  export default {
    data() {
      return {
        addingStudent: {
          name: '',
        },
        firebaseDatabase: firebase.database().ref('/jaehoon'),
      }
    },
    computed: {
      ...mapState([
        'database'
      ]),
      lateNumberList() {
        const arr = []
        const _getUnpaid = student => {
          return this.database.lates.filter(_e =>
            _e.student === student.id
          ).length
        }
        for (const e of this.database.students) {
          arr.push(_getUnpaid(e))
        }
        return arr
      },
      unpaidList() {
        const arr = []
        const _getUnpaid = student => {
          return (this.database.lates.filter(_e =>
            _e.student === student.id
          ).length - +student.paid) * this.database.penalty
        }
        for (const e of this.database.students) {
          arr.push(_getUnpaid(e))
        }
        return arr
      }
    },
    methods: {
      getUnpaid(student) {
        return ((this.database.lates.filter(_e =>
          _e.student === student.id
        ).length - +student.paid) * this.database.penalty + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      addStudent() {
        const studentNumber = this.database.studentNumber + 1

        const student = {
          id: studentNumber,
          name: this.addingStudent.name,
          paid: 0
        }

        this.firebaseDatabase.update({
          studentNumber,
          students: this.database.students.concat([student])
        })
      },
      updateStudent(event) {
        const confirm = window.confirm('내역을 되돌릴 수 없습니다. 정말 수정하시겠습니까?')
        if (!confirm) return

        const parent = event.target.parentElement
        const index = parent.querySelector('.index').value
        const student = this.database.students[index]

        this.firebaseDatabase.update({
          students: this.database.students
        })
      },
      deleteStudent(event) {
        const confirm = window.confirm('내역을 되돌릴 수 없습니다. 정말 삭제하시겠습니까?')
        if (!confirm) return

        const parent = event.target.parentElement
        const index = parent.querySelector('.index').value
        const student = this.database.students[index]

        this.database.students.splice(index, 1)

        this.firebaseDatabase.update({
          students: this.database.students
        })
      }
    }
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}

ul {
  list-style: none;
}

button {
  border: none;
  vertical-align: top;
  margin: 0 0.5em;
}

input {
  border: none;
  background-color: #748292;
  color: #FFF;
  height: 1.5em;
  padding: 0.25em 0.5em;
  vertical-align: top;
}

.name {
  width: 10em;
  margin-right: 1em;
}

.paid {
  width: 4em;
}

.lateResult,
.penaltyResult {
  display: inline-block;
  padding: 0 1em;
  margin: 0 0.5em;
  color: #fff;
}

.lateResult {
  background-color: #3287FC;
}

.penaltyResult {
  background-color: #fc9e32;
}

.unpaid {
  display: inline-block;
  width: 4em;
}

.late {
  display: inline-block;
  width: 2em;
  font-weight: bold;
}

.unpaid.warn {
  color: crimson;
}
</style>