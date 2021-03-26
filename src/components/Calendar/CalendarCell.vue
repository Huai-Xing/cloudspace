<template>
  <div>
    <li
      class="cell"
      :class="{
        dayCurrentMonth: isNotCurrentMonth,
        dayTodayCell: isToday,
      }"
      v-on:click="goToTasks"
    >
      <div class="cellItems">
        <li
          class="day"
          :class="{
            dayToday: isToday,
          }"
        >
          {{ date.get('date') }}
        </li>
        <div>
          <li class="items" v-for="item in data"  v-bind:key="item"
          :class="{ itemsEmpty: isNotCurrentMonth }">
            {{ item }}
          </li>
        </div>

      </div>
    </li>
  </div>
</template>


<script>
import dayjs from "dayjs";

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
      data: ["BT3103 Assignment 2", "Meeting with Group", "Take a short break :)", "Very very very very very very very very very very very long task"],
    };
  },
};
</script>


<style scoped>
.cell {
  list-style-type: None;
  display: inline-block;
  border: 1px solid rgb(230, 230, 230);
  position: relative;
  max-height: 94px;
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
.day:hover, .day:focus {
  color: black;
}
.dayToday {
  background-color: #26818f;
  color: white;
  font-weight: 700;
  border-radius: 100%;
  height:22px;
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
  background-color: rgb(255, 225, 187);
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
.itemsEmpty{
  visibility: hidden;
}
.items:nth-child(odd) {
  background-color: rgb(209, 224, 243);
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: rgb(255, 255, 255); 
}
::-webkit-scrollbar-thumb:hover {
  background: #888; 
}
</style>
