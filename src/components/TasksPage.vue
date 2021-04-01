<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="task">
    <i class="arrow left" v-on:click="change(0)"></i>
    <h2>{{ date.format("DD MMMM YYYY") }}</h2>
    <i class="arrow right" v-on:click="change(1)"></i>
    <span class="backToToday" v-show="!isToday" v-on:click="change(2)">Jump to today</span>

    <div class="deadlines">
      <p class="sublabel">Deadlines:</p>
      <new-deadline-form class="addTask" v-bind:taskDate="date"></new-deadline-form>
      <hr class="line" />
      <div class="tasksList" v-for="deadline in deadlines" v-bind:key="deadline[0]">
        <div v-if="checkDeadlineDate(deadline)">
          <br />
          <input type="checkbox" id="key" />
          <label for="key">
            {{ deadline[1].category }} - {{ deadline[1].title }}: Due on
            {{ deadline[1].datedue }} @ {{ deadline[1].timedue.hh
              }}{{ deadline[1].timedue.mm }}
          </label>
          <edit-deadline-form v-bind:idname="deadline[0]"></edit-deadline-form>
          <img src="../assets/task/trash_btn.png" v-bind:idname="deadline[0]" v-on:click="deleteDeadline($event)" />
        </div>
      </div>
    </div>

    <div class="tasks">
      <p class="sublabel">To Do:</p>
      <new-task-form class="addTask" v-bind:taskDate="date"></new-task-form>
      <hr class="line" />
      <br />
      <div class="label-container">
        <span class="taskLabel"> Category </span>
        <span class="taskLabel"> Task </span>
        <span class="taskLabel"> Time Allocated </span>
        <span class="taskLabel"> Status </span>
      </div>

      <div class="tasksList" v-for="task in tasks" v-bind:key="task[0]">
        <div v-if="checkTaskDate(task)">
          <div class="task-container">
            <span class="taskText"> {{ task[1].category }} </span>
            <span class="taskText"> {{ task[1].title }} </span>
            <span class="taskText">
              {{ task[1].duration.hh }}hr {{ task[1].duration.mm }}min
            </span>
            <span class="taskText"> {{ task[1].status }} </span>

            <span v-if="task[1].status == 'Incomplete'">
              <img src="../assets/task/start_btn.png" v-on:click="startTask($event)" v-bind:idname="task[0]" />
              <edit-task-form class="editTaskIcon" v-bind:idname="task[0]"></edit-task-form>
              <img src="../assets/task/trash_btn.png" v-bind:idname="task[0]" v-on:click="deleteTask($event)" />
            </span>

            <span v-if="task[1].status == 'Completed'">
              <img src="../assets/task/moreinfo_btn.png" v-bind:idname="task[0]" v-on:click="showInfo($event)" />
              <img src="../assets/task/trash_btn.png" v-bind:idname="task[0]" v-on:click="deleteTask($event)" />
            </span>
          </div>
          <hr class="line" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import fb from "../firebase";
import EditTaskForm from "./EditTaskForm.vue";
import MainNavigation from "./MainNavigation.vue";
import NewTaskForm from "./NewTaskForm.vue";
import dayjs from "dayjs";
import NewDeadlineForm from "./NewDeadlineForm.vue";
import EditDeadlineForm from "./EditDeadlineForm.vue";

export default {
  data() {
    return {
      date: dayjs(),
      user: fb.auth().currentUser.uid,
      tasks: [],
      deadlines: [],
      isToday: true,
    };
  },
  //Register Locally
  components: {
    appNav: MainNavigation,
    NewTaskForm,
    EditTaskForm,
    NewDeadlineForm,
    EditDeadlineForm,
  },
  methods: {
    //Checking which tasks to display
    checkTaskDate: function(task) {
      console.log(task[1].date.toDate());
      var date = this.date.get("date");
      var month = this.date.get("month");
      var year = this.date.get("year");
      let start = new Date(year, month, date, 0, 0, 0);
      let end = new Date(year, month, date, 23, 59, 59);
      if (task[1].date.toDate() >= start && task[1].date.toDate() <= end) {
        return true;
      } else {
        false;
      }
    },
    checkDeadlineDate: function(deadline) {
      let duedate = new Date(deadline[1].datedue);
      var month = duedate.getMonth();
      var date = duedate.getDate();
      var year = duedate.getFullYear();
      var end = new Date(
        year,
        month,
        date,
        deadline[1].timedue.hh,
        deadline[1].timedue.mm,
        59
      );
      var start = new Date(
        year,
        month,
        date - deadline[1].showInAdvance,
        0,
        0,
        0
      );
      console.log(start);
      console.log(end);

      if (this.date >= start && this.date <= end) {
        return true;
      } else {
        return false;
      }
    },
    //Fetching all user's tasks
    fetchTasks: function() {
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("tasksList")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.tasks.push([doc.id, doc.data()]);
          });
        });
    },
    //Fetching user's deadlines
    fetchDeadLines: function() {
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("deadlinesList")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.deadlines.push([doc.id, doc.data()]);
          });
        });
    },
    change: function(x) {
      if (x == 0) {
        this.date = this.date.subtract(1, "day");
      } else if (x == 1) {
        this.date = this.date.add(1, "day");
      } else {
        this.date = dayjs();
      }
      this.$router.push({
        name: "Tasks",
        params: {
          date: this.date.format()
        },
      });
      this.isToday = this.date.isSame(dayjs(), "day");
    },

    deleteTask: function(event) {
      let doc_id = event.target.getAttribute("idname");
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("tasksList")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    deleteDeadline: function(event) {
      let doc_id = event.target.getAttribute("idname");
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("deadlinesList")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    startTask: function(event) {
      let doc_id = event.target.getAttribute("idname");

      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("tasksList")
        .doc(doc_id)
        .get()
        .then((doc) => {
          let totalseconds =
            doc.data().duration.hh * 3600 + doc.data().duration.mm * 60;
          console.log(totalseconds);
          let title = doc.data().category + " - " + doc.data().title;
          this.$router.push({
            name: "Timer",
            params: {
              taskId: doc_id,
              timeForTask: totalseconds,
              taskTitle: title,
            },
          });
        });
    },
  },
  created() {
    this.fetchTasks();
    this.fetchDeadLines();
    this.date = dayjs(this.$route.params.date);
    this.isToday = this.date.isSame(dayjs(), "day");
  },
};
</script>

<style scoped>
.task {
  margin-left: 240px;
}

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

.deadlines {
  min-height: 150px;
  max-height: 150px;
}

.sublabel {
  font-family: lora;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
}

.addTask {
  float: right;
  margin-right: 6%;
}

.line {
  height: 2px;
  width: 96%;
  float: left;
  background-color: #607c868d;
  border: none;
}

.label-container {
  text-align: center;
  color: #34b2c5;
  display: grid;
  min-width: 96%;
  padding: 20px;
  grid-template-columns: 120px repeat(3, 1fr) 400px;
}

.taskLabel {
  font-family: montserrat;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
}

.task-container {
  text-align: center;
  display: grid;
  min-width: 96%;
  padding: 10px;
  grid-template-columns: 120px repeat(3, 1fr) 400px;
}

.taskText {
  font-family: Lora;
  text-decoration: none;
  font-size: 12px;
  padding-top: 10px;
}

img {
  height: 28px;
  width: auto;
  margin: 2px;
  text-align: center;
}

.editTaskIcon {
  display: inline-block;
}
</style>
