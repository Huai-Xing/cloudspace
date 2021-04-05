<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <productivity></productivity>
    {{ trees }}
    <!-- ProductivityPage contents -->
    <div class="content-item-line">
      <span>View by:</span>
      <button v-on:click="changeView(0)">Week</button>
      <button v-on:click="changeView(1)">Month</button>
      <button v-on:click="changeView(2)">Year</button>
      <button v-on:click="viewCustom()">Custom Range</button>
      <label v-show="custom" for="customFrom">From</label>
      <input
        v-show="custom"
        type="date"
        id="customFrom"
        v-model.trim="dateFromInput"
      />
      <label v-show="custom" for="customTo">To</label>
      <input
        v-show="custom"
        type="date"
        id="customTo"
        v-model.trim="dateToInput"
      />
      <button v-show="custom" v-on:click="changeView(3)">View Range</button>
      {{ dataInfo }}
      <line-chart
        v-bind:datacollection="datacollectionLine"
        v-on:drillDown="drillDown"
      ></line-chart>
    </div>
    <div class="content-item-bar">
      <p>{{ barTitle }}</p>
      <bar-chart v-bind:datacollection="datacollectionBar"></bar-chart>
    </div>
    <br />

    <div class="content-item">
      <div class="bottom-row" id="chart">
        <div class="column">
          <!-- uncomment below when the radarChart-component is done -->
          <radar-chart></radar-chart>
        </div>

        <div class="column">
          <!-- the tree summary component here -->
          <h3>Number of trees planted in total:</h3>
          <div class="tree-summary-circle">
            <!-- to replace this text to the bind data variable here -->
            <div class="summary-stat">3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";

// Importing the Chart Components
import LineChart from "./Charts/LineChart.vue";
import BarChart from "./Charts/BarChart.vue";
import RadarChart from "./Charts/RadarChart.vue";
import fb from "../firebase";

export default {
  //Register Locally
  components: {
    appNav: MainNavigation,
    LineChart,
    BarChart,
    RadarChart,
  },
  data() {
    return {
      user: fb.auth().currentUser.uid,
      trees: 0,
      custom: false,
      dataInfo: "",
      dateFrom: 7,
      dateTo: new Date(),
      dateFromInput: "",
      dateToInput: "",
      dateQuery: new Date(),
      barTitle: "",
      taskList: [],
      datacollectionLine: null,
      datacollectionBar: null,
    };
  },
  methods: {
    fetchNumOfTrees: function () {
      fb.firestore()
        .collection("users")
        .doc(this.user)
        .get()
        .then((doc) => {
          console.log(doc.data().user.trees);
          this.trees = doc.data().user.trees;
        });
    },
    drillDown: function (x, bool) {
      console.log("WORKS");
      console.log(x);
      if (bool) {
        this.dateQuery = new Date(x);
      } else {
        this.dateQuery = new Date();
      }
      this.generateBarData(this.taskList);
    },
    viewCustom: function () {
      this.custom = !this.custom;
    },
    changeView: function (x) {
      this.dateTo = new Date();
      if (x == 0) {
        this.dateFrom = 7;
        this.dateFromInput = "";
        this.dateToInput = "";
        this.custom = false;
      } else if (x == 1) {
        this.dateFrom = 31;
        this.dateFromInput = "";
        this.dateToInput = "";
        this.custom = false;
      } else if (x == 2) {
        this.dateFrom = 365;
        this.dateFromInput = "";
        this.dateToInput = "";
        this.custom = false;
      } else {
        this.dateTo = new Date(Date.parse(this.dateToInput));
        this.dateFrom =
          (Date.parse(this.dateToInput) - Date.parse(this.dateFromInput)) /
          (24 * 3600 * 1000);
      }
      this.fetchItems();
    },
    fetchItems: function () {
      var taskList = [];
      const from = new Date(this.dateTo); //new Date();
      from.setDate(from.getDate() - this.dateFrom);
      from.setHours(0, 0, 0, 0);
      const to = new Date(this.dateTo); //new Date();
      to.setDate(to.getDate());
      to.setHours(23, 59, 0, 0);
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("tasksList")
        .where("date", ">=", from)
        .where("date", "<", to)
        .orderBy("date")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data().date);
            taskList.push(doc.data());
          });
        })
        .then(() => {
          taskList = taskList.filter(this.checkStatus);
          if (taskList.length == 0) {
            this.dataInfo = "Data for selected dates unavailable";
          } else {
            this.dataInfo = "";
          }
          this.taskList = taskList;
          this.generateLineData(taskList);
          this.generateBarData(taskList);
          console.log(this.datacollectionBar);
        });
    },
    generateBarData: function (taskList) {
      var actual = [];
      var schedule = [];
      var breakTime = [];
      var labels = [];
      for (var i = 0; i < taskList.length; i++) {
        if (this.compareDate(this.dateQuery, taskList[i].date.toDate())) {
          var title = taskList[i].category + ": " + taskList[i].title;
          actual.push(taskList[i].actualTime);
          breakTime.push(taskList[i].breakTime);
          schedule.push(this.convertToSecond(taskList[i].duration));
          labels.push(title); //Time
        }
      }
      this.datacollectionBar = {
        labels: labels,
        datasets: [
          {
            label: "Actual Time Taken",
            data: actual,
            borderColor: "#3e95cd",
            backgroundColor: "#3e95cd",
          },
          {
            label: "Total Break Time",
            data: breakTime,
            borderColor: "#3cba9f",
            backgroundColor: "#3cba9f",
          },
          {
            label: "Scheduled Time",
            data: schedule,
            borderColor: "#8e5ea2",
            backgroundColor: "#8e5ea2",
          },
        ],
      };
      this.barTitle =
        "Breakdown of tasks for " + this.formatDate(this.dateQuery);
    },
    generateLineData: function (taskList) {
      var actual = 0;
      var breakTime = 0;
      var scheduled = 0;
      var currentDate = taskList[0].date.toDate();
      var actualList = [];
      var breakTimeList = [];
      var scheduledList = [];
      var labelList = [];
      for (var i = 0; i < taskList.length; i++) {
        if (this.compareDate(currentDate, taskList[i].date.toDate())) {
          actual += taskList[i].actualTime;
          breakTime += taskList[i].breakTime;
          scheduled += this.convertToSecond(taskList[i].duration);
        } else {
          actualList.push(actual); //Actual
          breakTimeList.push(scheduled); //Scheduled
          scheduledList.push(breakTime); //Break
          labelList.push(this.formatDate(currentDate)); //Time
          actual = taskList[i].actualTime;
          breakTime = taskList[i].breakTime;
          scheduled = this.convertToSecond(taskList[i].duration);
          currentDate = taskList[i].date.toDate();
        }
      }
      actualList.push(actual); //Actual
      breakTimeList.push(scheduled); //Scheduled
      scheduledList.push(breakTime); //Break
      labelList.push(this.formatDate(currentDate)); //Time
      this.datacollectionLine = {
        labels: labelList,
        datasets: [
          {
            label: "Actual Time Taken",
            data: actualList,
            borderColor: "#3e95cd",
            backgroundColor: "#3e95cd",
            fill: false,
          },
          {
            label: "Total Break Time",
            data: breakTimeList,
            borderColor: "#3cba9f",
            backgroundColor: "#3cba9f",
            fill: false,
          },
          {
            label: "Scheduled Time",
            data: scheduledList,
            borderColor: "#8e5ea2",
            backgroundColor: "#8e5ea2",
            fill: false,
          },
        ],
      };
    },
    compareDate: function (x, y) {
      if (x.getFullYear() == y.getFullYear()) {
        if (x.getMonth() == y.getMonth()) {
          if (x.getDate() == y.getDate()) {
            return true;
          }
        }
      }
      return false;
    },
    formatDate: function (x) {
      var year = x.getFullYear();
      var month = x.getMonth() + 1;
      var day = x.getDate();
      return day + "/" + month + "/" + year;
    },
    convertToSecond: function (x) {
      return x.hh * 3600 + x.mm * 60;
    },
    checkStatus: function (data) {
      return data.status == "Completed";
    },
  },
  created() {
    this.fetchNumOfTrees();
    this.fetchItems();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.content-item-line {
  border: 1px solid black;
  margin-left: 12%;
  display: block;
  width: 88%;
}
span {
  font-weight: 700;
}
button,
label {
  margin: 3px;
}
label {
  margin-left: 12px;
  margin-right: 8px;
}
#customTo {
  margin-right: 5px;
}
.content-item-bar {
  border: 1px solid black;
  margin-left: 12%;
  display: block;
  width: 88%;
}
.content-item-bar > p {
  border: 1px solid black;
  margin: 0;
  margin-top: 1%;
  padding: 0;
  width: 40%;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  text-decoration: underline;
}
.column {
  float: left;
  margin: 0 1.5%;

  width: 40%;
  padding: 10px;
  height: 400px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.bottom-row:after {
  content: "";
  display: table;
  clear: both;
}

/** Styling for the circle **/
.tree-summary-circle {
  /* (A) PERCENTAGE WIDTH & BORDER RADIUS */
  width: 30%;
  border-radius: 50%;

  /* (B) BACKGROUND COLOR */
  background: #bedaae;

  /* (C) NECESSARY TO POSITION TEXT BLOCK */
  line-height: 0;
  position: relative;

  /* I was trying to make the entire circle to be in the middle, but idk why the styling dont work */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* (D) MATCH HEIGHT */
.tree-summary-circle:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

/* (E) TEXT BLOCK */
.summary-stat {
  /* (E1) CENTER TEXT IN CIRCLE */
  position: absolute;
  bottom: 50%;
  width: 100%;
  text-align: center;

  /* (E2) THE FONT */
  /*font-weight: bold; */
  font-size: 100px;
  color: #fff;
}
</style>
