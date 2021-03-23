<template>
<div>
    <i class="arrow left" v-on:click="change(0)"></i>
    <h2>{{displayDate}}</h2>
    <i class="arrow right" v-on:click="change(1)"></i>
    <span v-show="isToday" v-on:click="change(2)">Jump to today</span>
    <ul>
      <li v-for="day in Days" v-bind:key="day">
        {{ day }}
      </li>
    </ul>

</div>
</template>


<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
        SelectedDate: dayjs(),
        isToday: false,
        Days: ["MON","TUE","WED","THUR","FRI","SAT","SUN"]
    }
  },
  methods: {
      change: function(x) {
          if (x == 0) {
              this.SelectedDate = this.SelectedDate.subtract(1,"month");
          } else if (x == 1) {
              this.SelectedDate = this.SelectedDate.add(1,"month");
          } else {
              this.SelectedDate = dayjs();
          }
          if (this.SelectedDate.get('month') == dayjs().get('month')) {
              this.isToday = false;
          } else {
              this.isToday = true;
          }
          this.$emit('changeMonth', this.SelectedDate)
      }
  },
  computed: {
      displayDate: function() {
          return this.SelectedDate.format("MMMM YYYY");
      },
  }
}
</script>


<style scoped>
h2 {
    display: inline-block;
    text-align: center;
    width: 180px;
}
.arrow {
  border: solid black;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;
  cursor: pointer;
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 5px;
  height: 5px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  width: 5px;
  height: 5px;
}
span {
  align-items: center;
  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
}
ul {
  margin: 0px;
  padding-left: 0px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
li {
  list-style-type: None;
  background-color: lightyellow;
  margin: 0px;
  padding-left: 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  min-width: 120px;
}
</style>