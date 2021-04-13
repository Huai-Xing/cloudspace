<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <div class="head">
      <p id="welcome">{{ name }}</p>
      <p id="phrase">Stay productive & plant trees</p>
      <quote></quote>
      <div class="dashboard">
        <div id="task" class="overview">
          <p class="overviewHead">Today's tasks</p>
          <div>
            <ul>
              <p v-show="taskEmpty">
                There is no task scheduled today.<br />Schedule one now and let
                cloudspace help you be productive.
              </p>
              <li v-for="data in task" v-bind:key="data.title" v-on:click="goToTaskPage('today')">
                <p class="mainListItem" id="taskContent">{{ data.category }}: {{ data.title }}</p>
                <p class="mainListItem" id="taskStatus">Status: {{ data.status }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div id="deadline" class="overview">
          <p class="overviewHead">Upcoming deadlines for the week</p>
          <div>
            <ul>
              <p v-show="deadlineEmpty">Hurray! No deadlines for this week!</p>
              <li v-for="data in deadline" v-bind:key="data">
                <p class="mainListItem" id="deadlineContent" v-on:click="goToTaskPage(data.datedue)">
                  {{ data.category }}: {{ data.title }}
                </p>
                <p class="mainListItem" id="deadlineStatus">
                  Due on: {{ getDate(data.datedue) }}, {{ data.timedue.hh }}{{ data.timedue.mm }}
                </p>
              </li>
            </ul>
          </div>
        </div>
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
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
      quote: quote,
    },
    computed: {
      taskEmpty: function() {
        return this.task.length == 0;
      },
      deadlineEmpty: function() {
        return this.deadline.length == 0;
      },
    },
    methods: {
      fetchData: async function() {
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
      fetchAll: function() {
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
      checkDate: function(date) {
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
      goToTaskPage: function(date) {
        if (date==="today") {
          this.$router.push({name:"Tasks"});
          return;
        }
        this.$router.push({name:"Tasks", params: {date: date}});
        return;
      },
      getDate(dateStr) {
        var d = new Date(dateStr);
        return d.getDate() + " " + this.month[d.getMonth()] + " " + d.getFullYear();
      }
    },
    created: async function() {
      await this.fetchData();
      this.fetchAll();
    },
  };
</script>

<style scoped>
  * {
    font-family: Lora;
  }
  .head {
    margin-left: 17%;
    margin-right: 17%;
    display: block;
    margin-bottom: 10px;
    padding-top: 2%;
    width: 75%;
  }
  #welcome {
    font-size: 28px;
    font-style: italic;
    font-weight: 650;
  }
  p {
    margin: 0;
    margin-left: 5px;
  }
  #phrase {
    color: rgb(110, 110, 110);
    font-family: "Source Sans Pro";
    font-size: 12px;
    margin-top: 0.5%;
    margin-bottom: 2%;
  }
  .dashboard {
    display: flex;
    margin-top: 3.5%;
  }
  .overview {
    display: inline-block;
    width: 50%;
    height: 15vw;
  }
  .overviewHead {
    background-color:#81b762;
    border-radius: 16px 16px 0 0;
    font-size: 16px;
    color: white;
    font-weight: 550;
    margin: 0;
    padding: 3% 3% 2% 4%;
  }
  .overview > div {
    position: relative;
    height: inherit;
    max-height: 80%;
    overflow: auto;
    border: 5px solid #81b762;
    border-radius: 0 0 16px 16px;
  }
  #task {
    margin-right: 5%;
  }
  ul {
    list-style-type: None;
    margin: 0;
    padding: 10px;
  }
  li {
    display: flex;
  }
  #taskContent {
    border-radius: 20px 0px 0px 20px;
    background-color: rgba(209, 209, 209, 0.5);
    padding: 2% 15px;
    margin-bottom: 1%;
    min-width: 65%;
    height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  li > p {
    font-family: "Source Sans Pro";
    font-size: 11px;
    text-align: left;
  }
  .mainItemList {
    font-family: "Source Sans Pro";
  }
  #taskStatus {
    border-radius: 0px 20px 20px 0px;
    border-left: 2px solid white;
    background-color: rgba(209, 209, 209, 0.5);
    padding: 2%;
    margin-bottom: 1%;
    margin-left: 0;
    height: 15px;
    min-width: 23%;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  #deadlineContent {
    border-radius: 20px 0px 0px 20px;
    background-color: rgba(209, 209, 209, 0.5);
    padding: 2% 15px;
    margin-bottom: 1%;
    min-width: 53%;
    height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  #deadlineStatus {
    border-radius: 0px 20px 20px 0px;
    border-left: 2px solid white;
    background-color: rgba(209, 209, 209, 0.5);
    padding: 2%;
    margin-bottom: 1%;
    margin-left: 0;
    height: 15px;
    min-width: 35%;
    text-overflow: ellipsis;
    cursor: pointer;
  }
</style>
