<template>
  <div>
    <li
      class="cell"
      :class="{
        dayCurrentMonth: isNotCurrentMonth,
      }"
    >
      <ul class="cellItems">
        <li
          class="day"
          :class="{
            dayToday: isToday,
          }"
        >
          {{ date.get('date') }}
        </li>
        <li class="items" v-for="item in data" v-bind:key="item">
          {{ item }}
        </li>
      </ul>
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
      data: ["BT3103 Assignment 2", "Meeting with Group"],
    };
  },
};
</script>


<style scoped>
.cell {
  list-style-type: None;
  display: inline-block;
  border: 1px solid rgb(100, 100, 100);
  height: 150px;
  margin: 0;
  padding: 0;
  width: 188px;
}
.dayCurrentMonth {
  background-color: rgb(224, 222, 222);
}
.cellItems {
  display: inline;
  align-content: center;
}
.day {
  list-style-type: None;
  display: block;
  border: 1px solid black;
  border-radius: 100%;
  height: 20px;
  width: 20px;
  text-align: center;
  color: black;
  position: relative;
  bottom: 15px;
  left: 80%;
}
.dayToday {
  background-color: rgb(0, 255, 106);
  color: black;
  font-weight: 900;
}
.items {
  list-style-type: None;
  display: block;
  border: 1px solid black;
  border-radius: 10px;
  background-color: lightyellow;
  margin: 5px;
  padding-left: 5px;
}
.items:nth-child(odd) {
  background-color: lightgreen;
}
</style>
