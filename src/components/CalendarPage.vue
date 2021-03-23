<template>
  <div>
      <!-- Side MainNavigation after log in -->
  <appNav></appNav>
  <div class="cal">
    <CalHeader v-on:changeMonth="reGenerate"></CalHeader>
    <ul>
      <CalCell v-for="date in dates" v-bind:key="date" :date="date" :selectedDate="selectedDate"></CalCell>
    </ul>
    </div>
  </div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import CalHeader from "./Calendar/CalendarHeader.vue";
import CalCell from "./Calendar/CalendarCell.vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      dates: [],
      selectedDate: dayjs(),
      //data: [],
    };
  },
  methods: {
    reGenerate: function(x) {
      this.generateDays(x);
      this.selectedDate = x;
    },
    generateDays: function(x = dayjs()) {
      var firstDay = x.startOf('month').get('day');
      var counter = 1 - firstDay;
      var days = []
      for (let i = 0; i < 35; i++) {
        var dayAdd = x.startOf('month').add(counter,'days');
        days.push(dayAdd)
        counter += 1;
      }
      this.dates = days;
    },
    /*
    fetchData: function () {
      database
        .collection("task")
        .where("UID", "==", uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.data.push({
              date: doc.data().DateCreated,
              category: doc.data().Category,
              TaskName: doc.data().TaskName,
            })
          });
        });
    },
    */
  },
  components: {
    CalHeader: CalHeader,
    CalCell: CalCell,
    'appNav': MainNavigation,
  },
  created: function() {
    this.generateDays();
  }
};
</script>


<style scoped>
.cal {
  margin-left: 200px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid blue;
  width: 98%;
}
</style>
