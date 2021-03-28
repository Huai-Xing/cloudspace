<template>
<div>
  <li class="cell" :class="{
        dayCurrentMonth: isNotCurrentMonth,
        dayTodayCell: isToday,
      }">
    <div class="cellItems">
  <li class="day" :class="{
            dayToday: isToday,
          }" v-on:click="goToTaskPage">
    {{ date.get('date') }}
  </li>
  <div>
    <li class="items" v-for="item in tasksToday" v-bind:key="item.title" :class="{ itemsEmpty: isNotCurrentMonth }" v-on:click="goToTaskPage">
      {{ item.title }}
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
        //"BT3103 Assignment 2",
        //"Meeting with Group",
        //"Take a short break :)",
        //"Very very very very very very very very very very very long task"
      ],
      tasksToday: []
    };
  },
  methods: {
    fetchData: function() {
      var uid = firebase.auth().currentUser.uid;
      firebase.firestore()
        .collection("users")
        .doc(uid)
        .collection("tasks")
        .get()
        .then((snap) =>
          snap.forEach((doc) => {
            //console.log(doc.data());
            if (this.compareDate(doc.data().date.toDate(), this.date)) {
              this.tasksToday.push(doc.data());
              this.data.push(doc.data().title);
            }
          })
        );
    },
    compareDate: function(curr, fixed) {
      if (
        curr.getDate() === fixed.date() &&
        curr.getMonth() == fixed.month() &&
        curr.getFullYear() == fixed.year()
      ) {
        return true;
      }
    },
    goToTaskPage: function() {
      this.$router.push({
        name: "Tasks",
        params: {
          date: this.date
        }
      }); // push with date
    }
  },
  created() {
    this.fetchData();

  }
};
</script>


<style scoped>
.cell {
  list-style-type: None;
  display: inline-block;
  border: 2px solid rgb(230, 230, 230);
  position: relative;
  min-height: 94px;
  max-height: 94px;
  min-width: 147px;
  padding: 3px;
  overflow: scroll;
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
  font-size: 13px;
  color: #26818f;
  list-style-type: None;
  display: block;
  height: 20px;
  width: 20px;
  /*border: 1px solid black;
  border-radius: 100%;*/
  text-align: right;
  position: sticky;
  top: 3px;
  left: 80%;
  margin-bottom: 8px;
  cursor: pointer;
}

.day:hover,
.day:focus {
  color: black;
}

.dayToday {
  background-color: #26818f;
  color: white;
  font-weight: 700;
  border-radius: 100%;
  height: 22px;
  width: 22px;
  padding-top: 2px;
  padding-left: 1px;
  padding-right: 1px;
  text-align: center;
  position: relative;
}

.items {
  font-family: roboto;
  font-size: 10px;
  text-align: left;
  list-style-type: None;
  display: block;
  border-radius: 4px;
  background-color: #ffe1bb;
  padding-left: 9px;
  padding-right: 9px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 3px;
  min-width: 80px;
  max-height: 10px;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.itemsEmpty {
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

::-webkit-scrollbar-thumb {
  background: #ffffff;
}

::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>
