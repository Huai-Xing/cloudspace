<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:imageIdx="imageIdx"></appNav>
    <div class="cal">
      <CalHeader v-on:changeMonth="reGenerate"></CalHeader>
      <ul>
        <CalCell
          v-for="(date, index) in dates"
          v-bind:key="date + index"
          :date="date"
          :selectedDate="selectedDate"
        ></CalCell>
      </ul>
    </div>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import CalHeader from "./Calendar/CalendarHeader.vue";
  import CalCell from "./Calendar/CalendarCell.vue";
  import dayjs from "dayjs";

  export default {
    data() {
      return {
        dates: [],
        selectedDate: dayjs(),
        imageIdx: this.$route.params.image,
      };
    },
    methods: {
      reGenerate: function(x) {
        this.generateDays(x);
        this.selectedDate = x;
      },
      generateDays: function(x = dayjs()) {
        var firstDay = x.startOf("month").get("day");
        var counter = 0 - firstDay;
        var days = [];
        for (let i = 0; i < 35; i++) {
          var dayAdd = x.startOf("month").add(counter, "days");
          days.push(dayAdd);
          counter += 1;
        }
        this.dates = days;
      },
    },
    components: {
      CalHeader: CalHeader,
      CalCell: CalCell,
      appNav: MainNavigation,
    },
    created: function() {
      this.generateDays();
    },
  };
</script>

<style scoped>
.cal {
  position: fixed;
  top: 70px;
  left: 230px;
  /* width: 1001px; */
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
</style>
