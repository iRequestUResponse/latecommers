<template>
  <div @click="hideModal" :class="{modal: true, canhide:true, on: show}">
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
          <div
            :class="{student: true, checked: !!addLaters.find(_e => _e.student === student.id)}"
            v-for="(student, studentIndex) in database.students"
            :key="studentIndex" v-show="!(dateInfo.laters || []).includes(student.id)"
            :data-info="JSON.stringify({studentid:student.id, dateInfo})"
            @click="addLater"
          >
            {{ student.name }}
          </div>
        </div>
      </div>
      <div class="buttons">
        <i class="submit fas fa-check" @click="submitLaters"></i>
        <i class="cancel fas fa-times canhide" @clirk="hideModal"></i>
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
        function equals(a, b) {
          return a.student === b.student
          && a.date == b.date
          && a.month == b.month
          && a.year == b.year
        }
        const lates = this.database.lates.filter(_e => !this.removeLaters.find(_r => equals(_e, _r)))

        const confirm = window.confirm('정말 수정하시겠습니까?')
        if (!confirm) return

        firebase.database().ref('/jaehoon').update({
          lates: [...lates, ...this.addLaters]
        })
      },
      hideModal(event) {
        if (event.target.classList.contains('canhide')) {
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
    font-size: 24px;
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
    display: block;
    top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #f7f7f7;
    position: sticky;
    border-radius: 16px;
    box-shadow: 0px 0px 64px -16px grey;
  }

  .allList .title {
    background-color: #fff;
    color: #6d3636;
    padding: .5em;
    font-weight: bold;
  }

  .allList > div {
    display: inline-block;
    vertical-align: top;
  }

  .laters,
  .student {
    width: 100px;
    height: 48px;
    font-weight: bold;
    font-size: 24px;
    vertical-align: middle;
    line-height: 48px;
    padding: 8px 12px;
    background-clip: content-box;
  }

  .laters {
    background-color: #f5eaea;
  }

  .laters:hover {
    background-color: #d8c3c3;
  }

  .student {
    background-color: #eaedf5;
  }

  .student:hover {
    background-color: #c3c9d8;
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

  .buttons {
    width: 100%;
    text-align: right;
  }

  .buttons > i {
    font-size: 48px;
    margin: 0 8px;
  }

  .submit {
    color: #4e9270;
  }

  .submit:hover {
    color: #3a614e;
  }

  .cancel {
    color: #924e4e;
  }

  .cancel:hover {
    color: #613a3a;
  }
</style>