<template>
  <div @click="hideModal" :class="{modal: true, on: show}">
    <div class="box">
      <span class="date">
        {{ dateInfo.month + 1 }}월 {{ dateInfo.date }}일
      </span>
      <!-- {{ database.lates }} -->
      <div class="allList">
        <div class="laterList">
          <div class="title">지각자</div>
          <div
            :class="{laters: true, checked: !!removeLaters.find(_e => _e.student === later)}"
            v-for="(later, laterIndex) in dateInfo.laters"
            :key="laterIndex"
            :data-info="JSON.stringify({studentid:later, dateInfo})"
            @click="removeLater"
          >
            {{ getName(later) }}
          </div>
        </div>
        <div class="studentList">
          <div class="title">학생목록</div>
          <div :class="{student: true, checked: !!addLaters.find(_e => _e.student === student.id)}" v-for="(student, studentIndex) in database.students" :key="studentIndex" v-show="!(dateInfo.laters || []).includes(student.id)"
          :data-info="JSON.stringify({studentid:student.id, dateInfo})"
          @click="addLater">
            {{ student.name }}
          </div>
        </div>
      </div>
      <div class="add">
        <button @click="submitLaters">제출</button>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    props: ['show', 'laters'],
    data() {
      return {
        studentAdd: false,
        addLaters: [],
        removeLaters: [],
      }
    },
    computed: {
      dateInfo() {
        return JSON.parse(this.laters)
      },
      ...mapState([
        'database'
      ]),
    },
    methods: {
      getName(studentId) {
        return (this.database.students.find(e => e.id === studentId) || {}).name
      },
      addLater(event) {
        const _t = event.target
        const info = JSON.parse(_t.dataset.info)
        
        const lates = this.database.lates.slice()

        const findMe = this.addLaters.find(_e => _e.student === info.studentid)

        if (findMe) {
          this.addLaters.splice(this.addLaters.indexOf(findMe), 1)
        } else {
          this.addLaters.push({
            date: info.dateInfo.date,
            month: info.dateInfo.month,
            year: info.dateInfo.year,
            student: info.studentid
          })
        }
      },
      removeLater(event) {
        const _t = event.target
        const info = JSON.parse(_t.dataset.info)
        
        const lates = this.database.lates.slice()

        const findMe = this.removeLaters.find(_e => _e.student === info.studentid)

        if (findMe) {
          this.removeLaters.splice(this.removeLaters.indexOf(findMe), 1)
        } else {
          this.removeLaters.push({
            date: info.dateInfo.date,
            month: info.dateInfo.month,
            year: info.dateInfo.year,
            student: info.studentid
          })
        }
      },
      submitLaters() {
        const lates = this.database.lates.filter(_e => !this.removeLaters.find(_r => _e.student === _r.student))

        const confirm = window.confirm('내역을 되돌릴 수 없습니다. 정말 수정하시겠습니까?')
        if (!confirm) return

        firebase.database().ref('/jaehoon').update({
          lates: [...lates, ...this.addLaters]
        })
      },
      hideModal(event) {
        if (event.target.classList.contains('modal')) {
          this.addLaters = []
          this.removeLaters = []
          this.$emit('hide')
        }
      },
    },
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .modal:not(.on) {
    display: none;
  }

  .box {
    position: absolute;
    background-color: #FFF;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2em 4em;
    box-shadow: 0px 0px 64px 0px grey;
    max-height: calc(100vh - 8em - 128px);
    overflow: auto;
  }

  .date {
    font-weight: bold;
  }

  .allList > div {
    width: 5em;
    display: inline-block;
    vertical-align: top;
    background-color: bisque;
    margin: 1em;
    padding: 1em;
    background-clip: content-box;
  }

  .allList .title {
    background-color: #fff;
    color: rgb(109, 54, 54);
    padding: .5em;
    font-weight: bold;
    margin: 0 0 1em;
  }

  .checked {
    font-weight: bold;
  }

  .laterList .checked {
    color: #fc4932;
  }

  .studentList .checked {
    color: #3287FC;
  }
</style>