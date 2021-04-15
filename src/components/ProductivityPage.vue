<template>
  <div id="full-content">
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:imageIdx="imageIdx"></appNav>
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
    <div class="bottom">
      <div class="content-item-bar">
        <p class="bottom-title">{{ barTitle }}</p>
        <bar-chart v-bind:datacollection="datacollectionBar"></bar-chart>
      </div>
      <div class="content-item-radar">
        <p class="bottom-title">{{ radarTitle }}</p>
        <radar-chart v-bind:datacollection="datacollectionRadar"></radar-chart>
      </div>
      <div class="content-item-circle">
        <p class="bottom-title">Number of trees planted</p>
        <div class="tree-summary-circle">
          <!-- to replace this text to the bind data variable here -->
          <div class="summary-stat">{{ trees }}</div>
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
        radarTitle: "",
        taskList: [],
        datacollectionLine: null,
        datacollectionBar: null,
        datacollectionRadar: null,
        imageIdx: this.$route.params.image,
      };
    },
    methods: {
      fetchNumOfTrees: function() {
        fb.firestore()
          .collection("users")
          .doc(this.user)
          .get()
          .then((doc) => {
            //console.log(doc.data().user.trees);
            this.trees = doc.data().user.trees;
            if (!this.trees) {
              this.trees = 0;
            }
          });
      },
      drillDown: function(x, bool) {
        //console.log(x);
        if (bool) {
          this.dateQuery = new Date(x);
        } else {
          this.dateQuery = new Date();
        }
        this.generateBarData(this.taskList);
      },
      viewCustom: function() {
        this.custom = !this.custom;
      },
      changeView: function(x) {
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
      fetchItems: function() {
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
      generateRadarData: function(taskList) {
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
        for (var l = 0; l < taskList.length; l++) {
          actual[l] = actual[l] / actCounter[l];
        }
        this.datacollectionRadar = {
          labels: labels,
          datasets: [
            {
              label: "Avg Actual Time",
              backgroundColor: ["rgba(64, 191, 128, 0.45)"],
              borderColor: "rgba(64, 191, 128, 0.45)",
              radius: 4,
              pointRadius: 4, //The size of the plotted points
              pointBorderWidth: 2,
              pointBackgroundColor: "limegreen",
              pointBorderColor: "rgba(64, 191, 128, 0.6)",
              pointHoverRadius: 7,
              data: actual,
            },
          ],
        };
        const from = new Date(this.dateTo); //new Date();
        from.setDate(from.getDate() - this.dateFrom);
        const to = new Date(this.dateTo); //new Date();
        to.setDate(to.getDate());
        this.radarTitle =
          "Average actual time taken per category for period " +
          this.formatDate(from) +
          " - " +
          this.formatDate(to);
      },
      generateBarData: function(taskList) {
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
      generateLineData: function(taskList) {
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
      compareDate: function(x, y) {
        if (x.getFullYear() == y.getFullYear()) {
          if (x.getMonth() == y.getMonth()) {
            if (x.getDate() == y.getDate()) {
              return true;
            }
          }
        }
        return false;
      },
      formatDate: function(x) {
        var year = x.getFullYear();
        var month = x.getMonth() + 1;
        var day = x.getDate();
        return day + "/" + month + "/" + year;
      },
      convertToSecond: function(x) {
        return x.hh * 3600 + x.mm * 60;
      },
      checkStatus: function(data) {
        return data.status == "Completed";
      },
      getUnqiue: function(value, index, self) {
        return self.indexOf(value) === index;
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
    font-family: Lora;
  }
  #full-content {
    margin-bottom: 50px;
  }
  .content-item-line {
    /* border: 1px solid black; */
    margin-left: 14%;
    display: block;
    width: 85%;
  }
  span {
    font-weight: 700;
  }
  button,
  label {
    margin: 3px;
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
  label {
    margin-left: 12px;
    margin-right: 8px;
  }
  #customTo {
    margin-right: 5px;
  }
  .bottom {
    /* border: 1px solid black; */
    margin-left: 14%;
    display: flex;
    width: 85%;
  }
  .content-item-bar {
    /* border: 1px solid black; */
    display: block;
    width: 42%;
  }
  .bottom-title {
    /* border: 1px solid black; */
    margin: 0;
    margin-top: 1%;
    margin-bottom: 2%;
    padding: 0;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-decoration: underline;
  }
  .content-item-radar {
    /* border: 1px solid black; */
    display: block;
    width: 35%;
  }
  .content-item-circle {
    /* border: 1px solid black; */
    display: block;
    width: 23%;
  }
  /** Styling for the circle **/
  .tree-summary-circle {
    /* (A) PERCENTAGE WIDTH & BORDER RADIUS */
    border-radius: 100%;

    /* (B) BACKGROUND COLOR */
    background: #bedaae;

    /* (C) NECESSARY TO POSITION TEXT BLOCK */
    line-height: 0;
    position: relative;
    margin: 15%;
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
    font-size: 100px;
    color: #fff;
  }
</style>
