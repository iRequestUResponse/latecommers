<template>
  <div>
    <span class="warn">학생 이름이 겹치면 헷갈릴 수 있으니 주의해주세요</span>
    <ul>
      <li v-for="(student, index) in database.students" :key="index">
        <span class="studentId">{{ student.id }}</span>
        <input type="text" v-model="student.name">
        <input type="number" v-model.number="student.paid">
        <button class="modify" @click="updateStudent" :key="index">수정</button>
      </li>
    </ul>
    <input type="text" v-model="addingStudent.name"> <button @click="addStudent">학생 추가</button>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import firebase from 'firebase'

  export default {
    data() {
      return {
        addingStudent: {
          name: '',
        }
      }
    },
    computed: {
      ...mapState([
        'database'
      ]),
    },
    methods: {
      ...mapMutations([ 
      ]),
      addStudent() {
        const student = {
          id: this.database.students.length + 1,
          name: this.addingStudent.name,
          paid: 0
        }

        firebase.database().ref('/jaehoon').update({
          students: this.database.students.concat([student])
        })
      },
      updateStudent(event) {
        console.log(event.target)
        const confirm = window.confirm('내역을 되돌릴 수 없습니다. 정말 수정하시겠습니까?')
        if (!confirm) return

        // const student = {
        //   id: 
        // }
      }
    }
  }
</script>

<style scoped>

</style>