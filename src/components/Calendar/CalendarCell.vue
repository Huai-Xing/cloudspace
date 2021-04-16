<template>
  <div class="container">
    <li
      class="cell"
      :class="{
        dayCurrentMonth: isNotCurrentMonth,
        dayTodayCell: isToday,
      }"
    >
      <div class="cellItems">
        <div class="day">
          <li
            :class="{
              dayToday: isToday,
            }"
            v-on:click="goToTaskPage"
          >
            {{ date.get('date') }}
          </li>
        </div>
        <div>
          <li class="deadlines" 
          v-for="item in deadlinesToday"  
          v-bind:key="item.title"
          :class="{ itemsEmpty: isNotCurrentMonth }" 
          v-on:click="goToTaskPage"
          >
            {{ item.title }}
          </li>

          <li class="items" 
          v-for="item in tasksToday"  
          v-bind:key="item.title"
          :class="{ itemsEmpty: isNotCurrentMonth }" 
          v-on:click="goToTaskPage"
          >
            {{ item.title }} <span v-show="item.status == 'Completed'"> &#10004;</span>
          </li>
        </div>

      </div>
    </li>
  </div>
</template>


<script>
import dayjs from "dayjs";
import firebase from '../../firebase';

export default {
  props: {
    date: Object,
    selectedDate: Object,
  },
  data() {
    return {
      isNotCurrentMonth: this.selectedDate.get('month') != this.date.get('month'),
      isToday: dayjs().format("DD MMMM YYYY") == this.date.format("DD MMMM YYYY"),
      todayDate: dayjs(),
      data: [
        // "BT3103 Assignment 2", 
        // "Meeting with Group", 
        // "Take a short break :)", 
        // "Very very very very very very very very very very very long task"
      ],
      tasksToday: [],
      deadlinesToday: [],
    };
  },
  methods: {
    fetchData: function () {
      var uid = firebase.auth().currentUser.uid;
      firebase.firestore()
        .collection("tasks")
        .doc(uid)
        .collection("deadlinesList")
        .get()
        .then((snap) =>
          snap.forEach((doc) => {
            if (this.compareDate(doc.data().date.toDate(), this.date)) {
              this.deadlinesToday.push(doc.data());
            }
          })
        );

      firebase.firestore()
        .collection("tasks")
        .doc(uid)
        .collection("tasksList")
        .get()
        .then((snap) =>
          snap.forEach((doc) => {
            if (this.compareDate(doc.data().date.toDate(), this.date)) {
              this.tasksToday.push(doc.data());
              this.data.push(doc.data().title);
            }
          })
        );
    },
    compareDate: function (curr, fixed) {
      if (
        curr.getDate() === fixed.date() &&
        curr.getMonth() == fixed.month() &&
        curr.getFullYear() == fixed.year()
      ) {
        return true;
      }
    },
    goToTaskPage: function() {
      this.$router.push({ name: "Tasks", params: { date: this.date.format() } }); // push with date
    }
  },
  created() {
    this.fetchData();

  }
};
</script>


<style scoped>
.container {
  margin: 0;
  height: 90px;
}
.cell {
  list-style-type: None;
  display: inline-block;
  border: 2px solid rgb(230, 230, 230);
  border-top: 0px;
  position: relative;
  min-height: 82px;
  max-height: 82px;
  min-width: 133px;
  padding: 3px;
  overflow: auto;
}
.dayCurrentMonth {
  background-color: rgb(220, 220, 220);
}
/*
.dayTodayCell {
  border: 3px solid rgb(192, 2, 2);
}*/
.cellItems {
  display: inline;
  align-content: center;
}
.day {
  font-family: montserrat;
  font-weight: 700;
  font-size: 11px;
  color: #26818f;
  list-style-type: None;
  display: block;
  height: 16px;
  /*border: 1px solid black;
  border-radius: 100%;*/
  /* text-align: right; */
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  padding-top: 3px;
  padding-right: 3px;
  margin-bottom: 3px;
  cursor: pointer;
}
.day:hover, .day:focus {
  color: black;
}
.dayToday {
  background-color: #26818f;
  color: white;
  border-radius: 100%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -3px;
}
.deadlines {
  font-family: Roboto;
  font-size: 10px;
  color: rgb(209, 5, 5);
  height: 10px;
  padding: 4px 9px;
}
.items {
  font-family: roboto;
  font-size: 9px;
  text-align: left;
  list-style-type: None;
  display: block;
  border-radius: 4px;
  background-color: #ffe1bb;
  padding: 4px 9px;
  margin: 3px 3px 0px 3px;
  height: 10px;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.itemsEmpty{
  visibility: hidden;
}
.items:hover {
  filter: brightness(90%);
}
.items:nth-child(odd) {
  background-color: #d1e0f3;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
/* ::-webkit-scrollbar-thumb {
  background: #ffffff; 
}
::-webkit-scrollbar-thumb:hover {
  background: #888; 
} */
li > span {
  position: sticky;
  left: 100%;
}
</style>
