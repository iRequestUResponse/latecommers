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
        <span>원 지불</span>
        <button class="modify" @click="updateStudent">수정</button>
        <button class="delete" @click="deleteStudent">삭제</button>
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
    },
    methods: {
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
  text-align: right;
}
</style>