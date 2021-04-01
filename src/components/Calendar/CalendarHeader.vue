<template>
<div>
  <i class="arrow left" v-on:click="change(0)"></i>
  <h2>{{ displayDate }}</h2>
  <i class="arrow right" v-on:click="change(1)"></i>
  <span class="backToToday" v-show="isToday" v-on:click="change(2)">Jump to today</span>
  <ul>
    <li v-for="day in Days" v-bind:key="day">
      {{ day }}
    </li>
  </ul>
</div>
</template>


<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      SelectedDate: dayjs(),
      isToday: false,
      Days: ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"],
    };
  },
  methods: {
    change: function(x) {
      if (x == 0) {
        this.SelectedDate = this.SelectedDate.subtract(1, "month");
      } else if (x == 1) {
        this.SelectedDate = this.SelectedDate.add(1, "month");
      } else {
        this.SelectedDate = dayjs();
      }
      if (this.SelectedDate.get("month") == dayjs().get("month")) {
        this.isToday = false;
      } else {
        this.isToday = true;
      }
      this.$emit("changeMonth", this.SelectedDate);
    },
  },
  computed: {
    displayDate: function() {
      return this.SelectedDate.format("MMMM YYYY");
    },
  },
};
</script>


<style scoped>
h2 {
  font-family: Lora;
  font-size: 20px;
  color: black;
  display: inline-block;
  text-align: center;
  width: 180px;
  margin-top: -100px;
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 2px;
  cursor: pointer;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 2px;
  height: 2px;
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  width: 2px;
  height: 2px;
}

.right:hover,
.left:hover {
  filter: opacity(0.6);
}

span {
  align-items: center;
  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
}

.backToToday {
  font-family: lora;
  color: #4d4d4d;
}

ul {
  margin: 0px;
  padding-left: 0px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

li {
  font-family: montserrat;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: white;
  background-color: #34b2c5;
  list-style-type: None;
  padding: 3px;
  text-align: center;
  min-width: max-content;
}
</style>
