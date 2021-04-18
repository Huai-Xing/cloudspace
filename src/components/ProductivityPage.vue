<template>
  <div id="full-content">
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <!-- ProductivityPage contents -->
    <div class="dashboard-content">
      <div class="left">
        <span class="title">Productivity</span><br />
        <div class="content-item-chart">
          <span class="viewby">View by:</span>
          <button v-on:click="changeView(0)">Week</button>
          <button v-on:click="changeView(1)">Month</button>
          <button v-on:click="changeView(2)">Year</button>
          <button v-on:click="viewCustom()">Custom Range</button>
          <br />
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
          <span class="viewby">{{ dataInfo }}</span>
          <line-chart
            v-bind:datacollection="datacollectionLine"
            v-on:drillDown="drillDown"
          ></line-chart>
        </div>
        <hr class="line" />
        <div class="content-item-tree">
          <p class="tree-bottom-title">Planted Trees</p>
          <span id="number-tree">Total number of trees planted: {{ treeList.length }}</span>
          <div class="tree-field">
            <p id="tree-default" v-show="treeList.length == 0">
              No trees are planted yet...<br />Buy one now with coins or donate
              money to plant one!
            </p>
            <ul v-show="treeList.length != 0">
              <li v-for="(tree, index) in treeList" v-bind:key="index">
                <img
                  class="treeImg"
                  :src="require(`@/assets/trees/${treeListPng[tree][0]}`)"
                />
                <p class="base"></p>
                <p class="treeName">{{ treeListPng[tree][1] }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="right">
        <div class="content-item-chart">
          <p class="bottom-title">{{ barTitle }}</p>
          <bar-chart v-bind:datacollection="datacollectionBar"></bar-chart>
        </div>
        <hr class="line" />
        <div class="content-item-chart">
          <p class="bottom-title">
            Average actual time taken per category for period
          </p>
          <p class="bottom-title">{{ radarTitle }}</p>
          <radar-chart
            v-bind:datacollection="datacollectionRadar"
          ></radar-chart>
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
      treeList: [],
      treeListPng: {},
      custom: false,
      dataInfo: "",
      dateFrom: 7,
      dateTo: new Date(),
      dateFromInput: "",
      dateToInput: "",
      dateQuery: new Date(),
      barTitle: "",
      radarTitle: "",
      taskList: [],
      datacollectionLine: null,
      datacollectionBar: null,
      datacollectionRadar: null,
    };
  },
  methods: {
    fetchTreeList: function () {
      fb.firestore()
        .collection("users")
        .doc(this.user)
        .get()
        .then((doc) => {
          this.treeList = doc.data().treeList;
          if (this.treeList == null) {
            this.treeList = [];
          }
        });
      fb.firestore()
        .collection("trees")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.treeListPng[doc.id] = [doc.data().url, doc.data().name];
          });
        });
    },
    drillDown: function (x, bool) {
      //console.log(x);
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
        const from = new Date(this.dateTo); //new Date();
        from.setDate(from.getDate() - this.dateFrom);
        from.setHours(0, 0, 0, 0);
        const to = new Date(this.dateTo); //new Date();
        to.setDate(to.getDate());
        to.setHours(23, 59, 0, 0);
        if (!(this.dateQuery >= from && this.dateQuery <= to)) {
          this.dateQuery = null;
        }
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
          this.generateRadarData(taskList);
        });
    },
    generateRadarData: function (taskList) {
      var actual = [];
      var catList = [];
      var actCounter = [];
      for (var i = 0; i < taskList.length; i++) {
        catList.push(taskList[i].category);
      }
      var labels = catList.filter(this.getUnqiue);
      for (var k = 0; k < labels.length; k++) {
        actual.push(0);
        actCounter.push(0);
      }
      for (var j = 0; j < taskList.length; j++) {
        var catIdx = labels.indexOf(taskList[j].category);
        var currentVal = actual[catIdx];
        var currentCount = actCounter[catIdx];
        actual[catIdx] = currentVal + taskList[j].actualTime;
        actCounter[catIdx] = currentCount + 1;
      }
      for (var l = 0; l < labels.length; l++) {
        actual[l] = actual[l] / actCounter[l];
      }
      this.datacollectionRadar = {
        labels: labels,
        datasets: [
          {
            label: "Avg Actual Time",
            backgroundColor: "rgba(255, 159, 64, 0.3)",
            borderColor: "rgba(255, 159, 64, 0.5)",
            radius: 4,
            pointRadius: 3, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: "limegreen",
            pointBorderColor: "rgba(255, 159, 64, 0.8)",
            pointHoverRadius: 6,
            data: actual,
          },
        ],
      };
      const from = new Date(this.dateTo); //new Date();
      from.setDate(from.getDate() - this.dateFrom);
      const to = new Date(this.dateTo); //new Date();
      to.setDate(to.getDate());
      this.radarTitle = this.formatDate(from) + " - " + this.formatDate(to);
    },
    generateBarData: function (taskList) {
      var actual = [];
      var schedule = [];
      var breakTime = [];
      var labels = [];
      if (this.dateQuery == null) {
        this.dateQuery = taskList[0].date.toDate();
      }
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
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
          {
            label: "Total Break Time",
            data: breakTime,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderWidth: 1,
          },
          {
            label: "Scheduled Time",
            data: schedule,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 1,
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
          breakTimeList.push(breakTime); //Scheduled
          scheduledList.push(scheduled); //Break
          labelList.push(this.formatDate(currentDate)); //Time
          actual = taskList[i].actualTime;
          breakTime = taskList[i].breakTime;
          scheduled = this.convertToSecond(taskList[i].duration);
          currentDate = taskList[i].date.toDate();
        }
      }
      actualList.push(actual); //Actual
      breakTimeList.push(breakTime); //Scheduled
      scheduledList.push(scheduled); //Break
      labelList.push(this.formatDate(currentDate)); //Time
      this.datacollectionLine = {
        labels: labelList,
        datasets: [
          {
            label: "Actual Time Taken",
            data: actualList,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Total Break Time",
            data: breakTimeList,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 1)",
            fill: false,
          },
          {
            label: "Scheduled Time",
            data: scheduledList,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 1)",
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
    getUnqiue: function (value, index, self) {
      return self.indexOf(value) === index;
    },
  },
  created() {
    this.fetchTreeList();
    this.fetchItems();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Lora;
}
#full-content {
  margin-bottom: 50px;
}
.dashboard-content {
  display: flex;
  margin-left: 230px;
  margin-right: 70px;
  padding: 0;
}
.left {
  /* border: 1px solid black; */
  /* margin-left: 70px; */
  margin-right: 0.5%;
  display: block;
  width: 70%;
}
.content-item-chart {
  /* border: 1px solid black; */
  display: block;
  padding-top: 5px;
}
.title {
  font-weight: 600;
  font-size: 24px;
}
.viewby {
  font-size: 12px;
  font-family: "Source Sans Pro";
  font-weight: 600;
  padding: 6px 12px;
}
button,
label,
input {
  margin: 3px;
  font-size: 10px;
  font-family: "Source Sans Pro";
}
button {
  height: auto;
  width: auto;
  padding: 5px;
  vertical-align: middle;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}
button:focus {
  box-shadow: inset 0px 0px 4px #c1c1c1;
  transform: translateY(1px);
  outline: none;
}
button:hover {
  transform: scale(1.1);
}
label {
  margin-left: 5px;
  margin-right: 3px;
}
#customTo {
  margin-right: 5px;
}
.right {
  /* border: 1px solid black; */
  display: block;
  width: 30%;
  margin-left: 0.5%;
}
.tree-bottom-title {
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  /* margin: 5px 0px 20px 0px; */
  display: inline-block;
  margin: 12px 0px;
}
#number-tree {
  font-family: "Source Sans Pro";
  font-size: 11px;
  font-weight: 500;
  position: sticky;
  padding: 8px 12px;
  margin: 5px 0px;
  color: #fff;
  background-color: #34b2c5;
  border-radius: 4px;
  float: right;
}
.bottom-title {
  /* border: 1px solid black; */
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
}
.line {
  border: 0.5px solid rgba(180, 180, 180, 0.4);
  margin: 20px 5px 15px 5px; /*Top right bottom left*/
}
.vertical-line {
  border-left: 1.5px solid rgba(180, 180, 180, 0.4);
  margin: 0 15px 0 15px;
  padding: 0;
}
.tree-field {
  border-radius: 50px;
  background-color: #c5d2d580;
  /* background-color: rgba(0, 199, 0, 0.5); */
  height: 38vh;
  margin: 5px;
  overflow: auto;
}
ul {
  list-style-type: None;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
li {
  list-style-type: None;
  margin: auto;
  padding: 0;
  margin: 10px auto;
}
.treeName {
  margin: 0;
  padding: 0;
  font-size: 9px;
  text-align: center;
}
.treeImg {
  display: block;
  /* border: 1px solid black; */
  width: 90px;
  height: 90px;
  overflow: hidden;
  margin-bottom: 0;
  margin-left: 5px;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-animation: swinging 5s ease-in-out forwards infinite;
  animation: swinging 5s ease-in-out forwards infinite;
}

@-webkit-keyframes swinging {
  0% {
    -webkit-transform: rotate(5deg);
  }
  50% {
    -webkit-transform: rotate(-3deg);
  }
  100% {
    -webkit-transform: rotate(5deg);
  }
}

@keyframes swinging {
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(5deg);
  }
}

.base {
  position: relative;
  top: -10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0;
  margin-bottom: 0;
  width: 80px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.24);
  border-radius: 100%;
}
#tree-default {
  margin-top: 19.5vh;
  text-align: center;
  opacity: 0.6;
}
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #39828d;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0c6472;
}
</style>
