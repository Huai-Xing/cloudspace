<template>
  <div class="container">
    <li
      class="cell"
      :class="{
        dayCurrentMonth: isNotCurrentMonth,
        dayTodayCell: isToday,
      }"
      v-on:click="goToTaskPage"
    >
      <div class="cellItems">
        <div class="day">
          <li
            :class="{
              dayToday: isToday,
            }"
          >
            {{ date.get("date") }}
          </li>
        </div>
        <div>
          <li
            class="deadlines"
            v-for="item in deadlinesToday"
            v-bind:key="item.title"
            :class="{ itemsEmpty: isNotCurrentMonth }"
          >
            {{ item.title
            }}<span v-show="item.status == 'Completed'"> &#10004;</span>
          </li>

          <li
            class="items"
            v-for="item in tasksToday"
            v-bind:key="item.title"
            :class="{ itemsEmpty: isNotCurrentMonth }"
          >
            {{ item.title }}
            <span v-show="item.status == 'Completed'"> &#10004;</span>
          </li>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import firebase from "../../firebase";

  export default {
    props: {
      date: Object,
      selectedDate: Object,
    },
    data() {
      return {
        isNotCurrentMonth:
          this.selectedDate.get("month") != this.date.get("month"),
        isToday:
          dayjs().format("DD MMMM YYYY") == this.date.format("DD MMMM YYYY"),
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
      fetchData: function() {
        var uid = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("tasks")
          .doc(uid)
          .collection("deadlinesList")
          .get()
          .then((snap) =>
            snap.forEach((doc) => {
              if (this.compareDate(new Date(doc.data().datedue), this.date)) {
                this.deadlinesToday.push(doc.data());
              }
            })
          );

        firebase
          .firestore()
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
          params: { date: this.date.format() },
        }); // push with date
      },
    },
    created() {
      this.fetchData();
    },
  };
</script>

<style scoped>
  .container {
    margin: 0;
    height: 104px;
  }
  .cell {
    list-style-type: None;
    display: inline-block;
    background-color: #fff;
    border: 2px solid rgb(230, 230, 230);
    /* border-top: 0px; */
    position: relative;
    min-height: 94px;
    max-height: 94px;
    min-width: 147px;
    padding: 3px;
    overflow: auto;
    cursor: pointer;
  }
  .dayCurrentMonth {
    background-color: #eeeeee;
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
    text-align: center;
    position: sticky;
    top: 3px;
    left: 85%;
    /* padding-top: 3px;
  padding-right: 3px; */
    margin-bottom: 5px;
    cursor: pointer;
  }
  .cell .day:hover,
  .cell .day:focus {
    color: black;
  }
  .dayToday {
    background-color: #26818f;
    color: white;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -3px;
  }
  .deadlines {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 11px;
    color: rgb(209, 5, 5);
    height: 10px;
    padding: 5px 9px;
    margin: 4px 3px 0 3px;
  }
  .items {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 11px;
    text-align: left;
    list-style-type: None;
    display: block;
    border-radius: 4px;
    background-color: #ffe1bb;
    padding: 5px 9px;
    margin: 4px 3px 0 3px;
    height: 10px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .itemsEmpty {
    visibility: hidden;
  }
  /* .items:hover {
  filter: brightness(90%);
} */
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
