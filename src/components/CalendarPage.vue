<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>
  <!--
    <div class="coinBox">
      <img src="../assets/coin.png" class="coinImg" />
      <span class="coinNo">{{ coins }}</span>
    </div>
    -->
  <div class="cal">
    <CalHeader v-on:changeMonth="reGenerate"></CalHeader>
    <ul>
      <CalCell v-for="date in dates" v-bind:key="date" :date="date" :selectedDate="selectedDate"></CalCell>
    </ul>
  </div>
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
      //data: [],
      //coins: 329,
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
  margin-top: -30px;
  margin-left: 240px;
  margin-right: 80px;
  z-index: -1;
}

ul {
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 0px;
}

.coinBox {
  display: flex;
  font-family: Lora;
  font-size: 18px;
  margin-left: 80%;
  border: 2px solid black;
  border-radius: 14px;
  width: max-content;
  padding: 0px 2px 0px 2px;
  align-items: center;
  justify-content: center;
}

.coinImg {
  height: 28px;
  margin: 2px;
}

.coinNo {
  padding: 5px;
}
</style>
