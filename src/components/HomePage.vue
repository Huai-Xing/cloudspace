<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <div class="head">
      <div class="dashboard">
        <span class="leftDashboard">
          <p id="welcome">{{ name }}</p>
          <p id="phrase">Stay productive & plant trees</p>

          <quote></quote><br />
          <div id="task" class="overview">
            <div class="overviewHead">
              <p>Today's tasks</p>
              <p id="date">{{ getDate(today.toString()) }}</p>
            </div>
            <hr class="line" />
            <div>
              <ul>
                <p v-show="taskEmpty">
                  There is no task scheduled today.<br />Schedule one now and
                  let cloudspace help you be productive.
                </p>
                <div class="itemList">
                  <li
                    v-for="data in task"
                    v-bind:key="data.title"
                    v-on:click="goToTaskPage('today')"
                  >
                    <p class="taskContent">
                      {{ data.category }}: {{ data.title }}
                    </p>
                    <p
                      class="taskStatus"
                      :class="{ incomplete: data.status == 'Incomplete' }"
                    >
                      Status: {{ data.status }}
                    </p>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </span>

        <span class="vl"></span>

        <span class="rightDashboard">
          <div id="deadline" class="overview">
            <div class="overviewHead">
              <p>Upcoming deadlines for the week</p>
              <img
                src="../assets/home/calendar-col.svg"
                v-on:click="goToCalendarPage"
              />
            </div>
            <div>
              <ul>
                <p v-show="deadlineEmpty">
                  Hurray! No deadlines for this week!
                </p>
                <div class="itemList">
                  <li
                    v-for="data in deadline"
                    v-bind:key="data"
                    v-on:click="goToTaskPage(data.datedue)"
                  >
                    <p class="deadlineStatus">
                      {{ getDate(data.datedue) }}, {{ data.timedue.hh
                      }}{{ data.timedue.mm }}
                    </p>
                    <p class="deadlineContent">
                      {{ data.category }}: {{ data.title }}
                    </p>
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <img class="girl" src="../assets/home/girl.png" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import fb from "../firebase.js";
import quote from "./Quote.vue";

export default {
  data() {
    return {
      name: "",
      deadline: [],
      task: [],
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      today: new Date(),
    };
  },
  //Register Locally
  components: {
    appNav: MainNavigation,
    quote: quote,
  },
  computed: {
    taskEmpty: function () {
      return this.task.length == 0;
    },
    deadlineEmpty: function () {
      return this.deadline.length == 0;
    },
  },
  methods: {
    fetchData: async function () {
      var currentUser = fb.auth().currentUser;
      var uid = currentUser.uid;
      await fb
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          this.name = "Hello, " + doc.data().user.name + "!";
        });
    },
    fetchAll: function () {
      var currentUser = fb.auth().currentUser;
      var uid = currentUser.uid;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tmr = new Date();
      tmr.setDate(tmr.getDate() + 1);
      tmr.setHours(0, 0, 0, 0);
      fb.firestore()
        .collection("tasks")
        .doc(uid)
        .collection("tasksList")
        .where("date", ">=", today)
        .where("date", "<", tmr)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            this.task.push(doc.data());
          });
        });
      fb.firestore()
        .collection("tasks")
        .doc(uid)
        .collection("deadlinesList")
        .orderBy("datedue") // sort by date
        .where("datedue", ">", today.toISOString().substring(0, 10)) // query dates after today
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            if (this.checkDate(doc.data().datedue)) {
              this.deadline.push(doc.data());
            }
          });
        });
    },
    checkDate: function (date) {
      //console.log(date);
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth() + 1;
      const day = targetDate.getDate();
      //console.log(year +" "+ month +" "+ day);
      if (year == parseInt(date.substring(0, 4))) {
        if (month == parseInt(date.substring(5, 7))) {
          if (day > parseInt(date.substring(8, 10))) {
            return true;
          }
        }
      }
      return false;
    },
    goToCalendarPage: function () {
      this.$router.push({ name: "Calendar" });
    },
    goToTaskPage: function (date) {
      if (date === "today") {
        this.$router.push({ name: "Tasks" });
        return;
      }
      this.$router.push({ name: "Tasks", params: { date: date } });
      return;
    },
    getDate(dateStr) {
      var d = new Date(dateStr);
      return (
        d.getDate() + " " + this.month[d.getMonth()] + " " + d.getFullYear()
      );
    },
  },
  created: async function () {
    await this.fetchData();
    this.fetchAll();
  },
};
</script>

<style scoped>
* {
  font-family: "Source Sans Pro";
}
p {
  margin: 0;
}
.head {
  margin-left: 230px;
  margin-right: 50px;
  display: block;
  /* margin-bottom: 10px; */
  /* padding-top: 20px; */
}
#welcome {
  font-family: Lora;
  font-size: 28px;
  font-style: italic;
  font-weight: 650;
}
#phrase {
  font-size: 11px;
  margin-top: 2px;
  margin-bottom: 10px;
  color: #aaa;
}
.dashboard {
  display: flex;
}
.vl {
  height: 550px;
  width: 0.4px;
  background-color: #ccc;
}
.leftDashboard {
  float: left;
  width: 68%;
}
.rightDashboard {
  width: 32%;
  margin-left: 30px;
}
/* .overview {
  display: inline-block;
  width: 90%;
  height: 15vw;
} */
/* .overviewHead {
  background-color: #81b762;
  border-radius: 16px 16px 0 0;
  font-size: 16px;
  color: white;
  font-weight: 550;
  margin: 0;
  padding: 3% 3% 2% 4%;
} */
/* .overview > div {
  position: relative;
  height: inherit;
  max-height: 80%;
  overflow: auto;
  border: 5px solid #81b762;
  border-radius: 0 0 16px 16px;
} */
ul {
  list-style-type: None;
  margin: 0;
  /* padding: 10px; */
  padding-inline-start: 0px;
}
li {
  display: flex;
}
li > p {
  font-family: "Source Sans Pro";
  font-size: 11px;
  text-align: left;
}
.taskContent {
  border-radius: 20px 0px 0px 20px;
  background-color: rgba(209, 209, 209, 0.5);
  padding: 14px 15px;
  margin-bottom: 8px;
  min-width: 69%;
  height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.taskStatus {
  border-radius: 0px 20px 20px 0px;
  border-left: 6px solid white;
  background-color: #81b76240;
  padding: 14px;
  margin-bottom: 8px;
  height: 15px;
  /* min-width: 23%; */
  flex-grow: 1;
  text-overflow: ellipsis;
  cursor: pointer;
}
.incomplete {
  background-color: #ea472c28;
}
.deadlineStatus {
  border-radius: 20px 0px 0px 20px;
  background-color: rgba(209, 209, 209, 0.5);
  padding: 8px;
  margin-bottom: 5px;
  height: 15px;
  min-width: 30%;
  text-align: center;
  text-overflow: ellipsis;
  cursor: pointer;
}
.deadlineContent {
  border-radius: 0px 20px 20px 0px;
  background-color: rgba(209, 209, 209, 0.25);
  border-left: 3px solid white;
  padding: 8px 15px;
  margin-bottom: 5px;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
img {
  width: 26px;
  order: 2;
  margin-left: auto;
  cursor: pointer;
}
.girl {
  position: fixed;
  width: 280px;
  bottom: 25px;
  right: 40px;
  opacity: 80%;
  cursor: default;
}
.overview {
  margin-top: 10px;
  width: 94%;
}
.overviewHead {
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 0.6px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.overviewHead > p {
  font-family: "Source Sans Pro";
}
#date {
  font-family: "Source Sans Pro";
  margin-left: auto;
  order: 2;
}
.line {
  height: 0.4px;
  background-color: #ccc;
  border: none;
  width: 105%;
  margin-left: -10px;
}
.itemList {
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
