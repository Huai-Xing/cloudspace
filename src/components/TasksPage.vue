<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <div class="task">
      <i class="arrow left" v-on:click="change(0)"></i>
      <h2>{{ date.format('DD MMMM YYYY') }}</h2>
      <i class="arrow right" v-on:click="change(1)"></i>
      <span class="backToToday" v-show="isToday" v-on:click="change(2)"
        >Jump to today</span
      >

      <div class="deadlines">
        <p class="sublabel">Deadlines:</p>
        <new-task-form class="addTask"></new-task-form>
        <hr class="line" />
        <div class="deadlinesList"></div>
      </div>

      <div class="tasks">
        <p class="sublabel">To Do:</p>
        <new-task-form class="addTask"></new-task-form>
        <hr class="line" />
        <br />
        <div class="label-container">
          <span class="taskLabel"> Category </span>
          <span class="taskLabel"> Task </span>
          <span class="taskLabel"> Est. Duration </span>
          <span class="taskLabel"> Status </span>
        </div>

        <div class="tasksList" v-for="task in data" v-bind:key="task.category">
          <div class="task-container">
            <span class="taskText"> {{ task.category }} </span>
            <span class="taskText"> {{ task.task }} </span>
            <span class="taskText"> {{ task.duration }} </span>
            <span class="taskText"> {{ task.status }} </span>
            <span>
              <img src="../assets/task/start_btn.png" />
              <img src="../assets/task/edit_btn.png" />
              <img src="../assets/task/trash_btn.png" />
            </span>
          </div>
          <hr class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import NewTaskForm from "./NewTaskForm.vue";
import dayjs from "dayjs";

export default {
  //Register Locally
  components: {
    appNav: MainNavigation,
    NewTaskForm,
  },
  data() {
    return {
      date: dayjs(),
      data: {
        task1: {
          category: "BT3103",
          task: "Discovery Assignment",
          duration: "1 hr 00 min",
          status: "incomplete",
        },
        task2: {
          category: "GEH1000",
          task: "Worksheet",
          duration: "1 hr 30 min",
          status: "incomplete",
        },
      },
    };
  },
  methods: {
    change: function (x) {
      if (x == 0) {
        this.date = this.date.subtract(1, "day");
      } else if (x == 1) {
        this.date = this.date.add(1, "day");
      } else {
        this.date = dayjs();
      }
      this.$emit("changeMonth", this.SelectedDate);
    },
  },
  created() {
    var passedDate = this.$route.params.date;
    if (Object.keys(passedDate).length != 0) {
      this.date = passedDate;
    } else {
      this.date = dayjs();
    }
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
</style>
