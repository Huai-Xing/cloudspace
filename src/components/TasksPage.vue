<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    {{ date.toDate() > test }}
    {{ date.toDate() }}
    {{ test }}

    <!-- Tasks
    To Do: <new-task-form></new-task-form>
    <table>
      <tr>
        <th>Category</th>
        <th>Title</th>
        <th>Time allocated</th>
        <th>Status</th>
      </tr>
      <tr v-for="task in tasks" v-bind:key="task[0]">
        <td>{{ task[1].category }}</td>
        <td>{{ task[1].title }}</td>
        <td>{{ task[1].duration }}</td>
        <td>{{ task[1].status }}</td> -->

    <!-- Incomplete status -->
    <!-- <div v-if="task[1].status == 'incomplete'">
          <button>Start task</button>
          <edit-form v-bind:idname="task[0]"></edit-form>
          <button>Delete</button>
        </div> -->
    <!-- Complete status -->
    <!-- <div v-if="task[1].status == 'complete'">
          <button>More Info</button>
          <button>Delete</button>
        </div>
      </tr>
    </table> -->

    <div class="task">
      <i class="arrow left" v-on:click="change(0)"></i>
      <h2>{{ date.format("DD MMMM YYYY") }}</h2>
      <i class="arrow right" v-on:click="change(1)"></i>
      <span class="backToToday" v-show="isToday" v-on:click="change(2)"
        >Jump to today</span
      >
      {{ date.get("month") }}
      {{ date.get("year") }}
      {{ date.get("date") }}

      <div class="deadlines">
        <p class="sublabel">Deadlines:</p>
        <new-task-form class="addTask" v-bind:taskDate="date"></new-task-form>
        <hr class="line" />
        <div class="deadlinesList"></div>
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
          <div class="task-container">
            <span class="taskText"> {{ task[1].category }} </span>
            <span class="taskText"> {{ task[1].title }} </span>
            <span class="taskText">
              {{ task[1].duration.hh }}hr {{ task[1].duration.mm }}min
            </span>
            <span class="taskText"> {{ task[1].status }} </span>

            <span v-if="task[1].status == 'Incomplete'">
              <img src="../assets/task/start_btn.png" />
              <edit-form v-bind:idname="task[0]"></edit-form>
              <img
                src="../assets/task/trash_btn.png"
                v-bind:idname="task[0]"
                v-on:click="deleteTask($event)"
              />
            </span>

            <span v-if="task[1].status == 'Complete'">
              <button>More info</button>
              <img
                src="../assets/task/trash_btn.png"
                v-bind:idname="task[0]"
                v-on:click="deleteTask($event)"
              />
            </span>
          </div>
          <hr class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fb from "../firebase";
  import EditForm from "./EditForm.vue";
  import MainNavigation from "./MainNavigation.vue";
  import NewTaskForm from "./NewTaskForm.vue";
  import dayjs from "dayjs";

  export default {
    data() {
      return {
        date: dayjs(),
        user: fb.auth().currentUser.uid,
        tasks: [],
        test: new Date(2021, 2, 30, 0, 0),
      };
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
      NewTaskForm,
      EditForm,
    },
    methods: {
      fetchTasks: function() {
        var day = this.date.toDate().get("date");
        var month = this.date.toDate().get("month");
        var year = this.date.toDate().get("year");
        let start = new Date(year, month, day, 0, 0);
        let end = new Date(year, month, day, 23, 59);
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .where(date, ">=", start)
          .where(date, "<=", end)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.tasks.push([doc.id, doc.data()]);
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
        this.$emit("changeMonth", this.SelectedDate);
      },
      deleteTask: function(event) {
        let doc_id = event.target.getAttribute("idname");
        console.log(doc_id);
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
    },
    created() {
      this.fetchTasks();
      var passedDate = this.$route.params.date;
      if (Object.keys(passedDate).length != 0) {
        this.date = passedDate;
      } else {
        this.date = dayjs();
      }
    },
  };
  // =======
  // import MainNavigation from "./MainNavigation.vue";
  // import NewTaskForm from "./NewTaskForm.vue";
  // import dayjs from "dayjs";

  // export default {
  //   //Register Locally
  //   components: {
  //     appNav: MainNavigation,
  //     NewTaskForm,
  //   },
  //   data() {
  //     return {
  //       date: dayjs(),
  //       data: {
  //         task1: {
  //           category: "BT3103",
  //           task: "Discovery Assignment",
  //           duration: "1 hr 00 min",
  //           status: "incomplete",
  //         },
  //         task2: {
  //           category: "GEH1000",
  //           task: "Worksheet",
  //           duration: "1 hr 30 min",
  //           status: "incomplete",
  //         },
  //       },
  //     };
  //   },
  //   methods: {
  //     change: function (x) {
  //       if (x == 0) {
  //         this.date = this.date.subtract(1, "day");
  //       } else if (x == 1) {
  //         this.date = this.date.add(1, "day");
  //       } else {
  //         this.date = dayjs();
  //       }
  //       this.$emit("changeMonth", this.SelectedDate);
  // >>>>>>> 5e5a4448d00ad5d27e605bb7f256801b3e84dbb5
  //     },
  //   },
  //   created() {
  //     var passedDate = this.$route.params.date;
  //     if (Object.keys(passedDate).length != 0) {
  //       this.date = passedDate;
  //     } else {
  //       this.date = dayjs();
  //     }
  //   },
  // };
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
