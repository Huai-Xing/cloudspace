<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:imageIdx="imageIdx"></appNav>

    <coin-box :coins="coins"></coin-box>

    <div class="task">
      <i class="arrow left" v-on:click="change(0)"></i>
      <h2>{{ date.format("DD MMMM YYYY") }}</h2>
      <i class="arrow right" v-on:click="change(1)"></i>
      <span class="backToToday" v-show="!isToday" v-on:click="change(2)"
        >Jump to today</span
      >

      <div class="deadlines">
        <p class="sublabel">Deadlines:</p>
        <new-deadline-form
          class="addTask"
          v-bind:taskDate="date"
          v-tooltip.bottom="{ content: 'Add deadline' }"
        ></new-deadline-form>

        <div id="deadlineToggle" v-on:click="toggleDeadlines">
          {{ toggleDeadlineText }}
        </div>

        <!-- <hr class="line" /> -->
        <div class="deadlinesList">
          <span v-for="deadline in deadlines" v-bind:key="deadline[0]">
            <span v-if="checkDeadlineDate(deadline)" class="deadlinesBox">
              <input
                class="checkbox"
                type="checkbox"
                :value="deadline[0]"
                id="deadline[0]"
                @change="updateDeadlines"
                v-model="updatedCheckedDeadlines"
              />

              <deadlines-box
                :category="deadline[1].category"
                :title="deadline[1].title"
                :datedue="deadline[1].datedue"
                :hour="deadline[1].timedue.hh"
                :min="deadline[1].timedue.mm"
              >
              </deadlines-box>

              <edit-deadline-form
                v-bind:idname="deadline[0]"
                class="editBtn"
              ></edit-deadline-form>

              <delete-deadline-warning
                v-bind:idname="deadline[0]"
                class="editBtn"
              ></delete-deadline-warning>
            </span>
          </span>
        </div>
      </div>

      <hr class="line" />
      <br />

      <div>
        <p class="sublabel">To Do:</p>
        <template v-if="dataLoaded">
          <new-task-form
            class="addTask"
            v-bind="{ taskDate: date, taskCount: tasksToday.length }"
            v-tooltip.bottom="'Add new task'"
          ></new-task-form>
        </template>
        <!-- <hr class="line" /> -->
        <br />
        <div class="label-container">
          <span class="taskLabel"> Category </span>
          <span class="taskLabel"> Task </span>
          <span class="taskLabel"> Time Allocated </span>
          <span class="taskLabel"> Status </span>
        </div>

        <div v-if="tasksToday.length === 0 && dataLoaded" class="noTasksToday">
          <img class="man" src="../assets/task/task-man.png" />
          <p>You have no tasks for the day!</p>
          <img class="signpost" src="../assets/task/task-sign.png" />
        </div>

        <div class="tasksList" v-if="tasksToday.length > 0">
          <draggable ghost-class="ghost" @end="onEnd">
            <transition-group type="transition" name="flip-list">
              <div
                class="sortable"
                v-for="task in tasksToday"
                v-bind:key="task[0]"
              >
                <!-- <div v-if="checkTaskDate(task)"> -->

                <div class="task-container">
                  <span class="taskText"> {{ task[1].category }} </span>
                  <span class="taskText"> {{ task[1].title }} </span>
                  <span class="taskText">
                    {{ task[1].duration.hh }}hr {{ task[1].duration.mm }}min
                  </span>
                  <span
                    class="taskText"
                    :class="{
                      incompleteText: task[1].status != 'Completed',
                      completeText: task[1].status == 'Completed',
                    }"
                  >
                    {{ task[1].status }}
                  </span>

                  <span v-if="task[1].status == 'Incomplete'">
                    <img
                      src="../assets/task/hourglass-col.svg"
                      v-on:click="startTask($event)"
                      v-bind:idname="task[0]"
                      class="editBtn"
                      v-tooltip.bottom="'Start timer'"
                    />
                    <edit-task-form
                      style="display: inline-block"
                      v-bind:idname="task[0]"
                      class="editBtn"
                    ></edit-task-form>

                    <delete-task-warning
                      style="display: inline-block"
                      v-bind:idname="task[0]"
                      class="editBtn"
                    ></delete-task-warning>
                  </span>

                  <span v-if="task[1].status == 'Completed'">
                    <v-popover offset="16" placement="left" class="editBtn">
                      <!-- This will be the popover target (for the events and position) -->

                      <img
                        src="../assets/task/pending-col.svg"
                        v-bind:idname="task[0]"
                        class="editBtn"
                        v-tooltip.bottom="'More info'"
                      />

                      <!-- This will be the content of the popover -->
                      <template slot="popover">
                        <div class="tooltip-content">
                          Coins Earned: {{ task[1].coinsEarned }}
                          <br />
                          Total Time:
                          {{ Math.floor(task[1].actualTime / 3600) }} hrs
                          {{ Math.floor((task[1].actualTime % 3600) / 60) }}
                          min
                          {{ Math.floor((task[1].actualTime % 3600) % 60) }} s
                          <br />
                          Total Break Time:
                          {{ Math.floor(task[1].breakTime / 3600) }} hrs
                          {{ Math.floor((task[1].breakTime % 3600) / 60) }}
                          min
                          {{ Math.floor((task[1].breakTime % 3600) % 60) }} s
                        </div>
                      </template>
                    </v-popover>

                    <delete-task-warning
                      v-bind:idname="task[0]"
                      class="editBtn"
                    ></delete-task-warning>
                  </span>
                </div>
                <!-- <hr class="line" /> -->
                <!-- </div> -->
              </div>
            </transition-group>
          </draggable>
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
  import DeleteTaskWarning from "./DeleteTaskWarning.vue";
  import DeleteDeadlineWarning from "./DeleteDeadlineWarning.vue";
  import DeadlinesBox from "./Tasks/DeadlinesBox.vue";
  import CoinBox from "./CoinBox.vue";

  export default {
    data() {
      return {
        date: dayjs(),
        user: fb.auth().currentUser.uid,
        tasks: [],
        tasksToday: [],
        dataLoaded: false,
        deadlines: [],
        isToday: true,
        moreInfoPacket: [],
        coins: 0,
        currentCheckedDeadlines: [],
        updatedCheckedDeadlines: [],
        showupdatedCheckedDeadlines: false,
        toggleDeadlineText: "Show completed deadlines",
        imageIdx: this.$route.params.image,
      };
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
      NewTaskForm,
      EditTaskForm,
      NewDeadlineForm,
      EditDeadlineForm,
      DeleteTaskWarning,
      DeleteDeadlineWarning,
      DeadlinesBox,
      CoinBox,
    },
    methods: {
      toggleDeadlines: function() {
        this.showupdatedCheckedDeadlines = !this.showupdatedCheckedDeadlines;
        if (this.showupdatedCheckedDeadlines) {
          this.toggleDeadlineText = "Hide completed deadlines";
        } else {
          this.toggleDeadlineText = "Show completed deadlines";
        }
      },
      getUpdateList: function() {
        var longSet;
        var shortSet;
        var uncheck; //True means a deadline was unchecked
        if (
          this.currentCheckedDeadlines.length >
          this.updatedCheckedDeadlines.length
        ) {
          longSet = new Set(this.currentCheckedDeadlines);
          shortSet = new Set(this.updatedCheckedDeadlines);
          uncheck = true;
        } else {
          longSet = new Set(this.updatedCheckedDeadlines);
          shortSet = new Set(this.currentCheckedDeadlines);
          uncheck = false;
        }
        var diff = new Set([...longSet].filter((x) => !shortSet.has(x)));
        var newStatus = uncheck ? "Incomplete" : "Completed";
        var deadlineId = diff.values().next().value;
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("deadlinesList")
          .doc(deadlineId)
          .update({
            status: newStatus,
          })
          .then(() => {
            for (var i = 0; i < this.deadlines.length; i++) {
              if (this.deadlines[i][0] == deadlineId) {
                this.deadlines[i][1].status = newStatus;
              }
            }
          });
        this.currentCheckedDeadlines = this.updatedCheckedDeadlines;
      },
      updateDeadlines: function() {
        this.$nextTick(() => {
          this.getUpdateList();
        });
      },
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
        // console.log(start);
        // console.log(end);

        if (this.date >= start && this.date <= end) {
          if (deadline[1].status != "Incomplete") {
            return this.showupdatedCheckedDeadlines;
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
      // Fetching user's coins
      fetchCoins() {
        fb.firestore()
          .collection("users")
          .doc(this.user)
          .get()
          .then((doc) => {
            this.coins = doc.data().user.coins;
          });
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
          })
          .then(() => (this.dataLoaded = true));
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
              if (doc.data().status == "Completed") {
                this.updatedCheckedDeadlines.push(doc.id);
                this.currentCheckedDeadlines.push(doc.id);
              }
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
          params: { date: this.date.format() },
        });
        this.isToday = this.date.isSame(dayjs(), "day");
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
      // showInfo: function(event) {
      //   let doc_id = event.target.getAttribute("idname");
      //   fb.firestore()
      //     .collection("tasks")
      //     .doc(this.user)
      //     .collection("tasksList")
      //     .doc(doc_id)
      //     .get()
      //     .then((doc) => {
      //       this.moreInfoPacket = doc.data();
      //       console.log(this.moreInfoPacket);
      //     });
      // },

      populateToday: function() {
        this.tasksToday = [];
        for (var i = 0; i < this.tasks.length; i++) {
          var item = this.tasks[i];
          if (this.checkTaskDate(item)) {
            this.tasksToday.push(item);
          }
        }
        this.tasksToday.sort(function(a, b) {
          return parseInt(a[1].index) - parseInt(b[1].index);
        });
      },

      onEnd: function(evt) {
        // console.log(evt);
        // this.oldIndex = evt.oldIndex;
        // this.newIndex = evt.newIndex;

        const taskRef = fb
          .firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList");

        // update changed task
        taskRef
          .doc(this.tasksToday[evt.oldIndex][0])
          .update({ index: evt.newIndex });

        // update affected tasks
        var affectedTasks = []; //array of doc id
        var inc = 0;
        var i;

        // if task shifts up
        if (evt.oldIndex > evt.newIndex) {
          for (i = evt.newIndex; i < evt.oldIndex; i++) {
            affectedTasks.push(this.tasksToday[i][0]);
          }
          inc = 1;
          // if task shifts down
        } else if (evt.oldIndex < evt.newIndex) {
          for (i = evt.oldIndex + 1; i <= evt.newIndex; i++) {
            affectedTasks.push(this.tasksToday[i][0]);
          }
          inc = -1;
        }

        taskRef
          .where(fb.firestore.FieldPath.documentId(), "in", affectedTasks)
          .get()
          .then((snap) => {
            snap.forEach((task) =>
              taskRef
                .doc(task.id)
                .update({ index: fb.firestore.FieldValue.increment(inc) })
            );
          });
      },
    },
    created() {
      this.fetchCoins();
      this.fetchTasks();
      this.fetchDeadLines();
      this.date = dayjs(this.$route.params.date);
      this.isToday = this.date.isSame(dayjs(), "day");
    },
    watch: {
      dataLoaded: function() {
        this.populateToday();
      },
      date: function() {
        this.populateToday();
      },
    },
  };
</script>

<style scoped>
  .task {
    margin-left: 230px;
  }
  h2 {
    font-family: Lora;
    font-size: 24px;
    color: black;
    display: inline-block;
    text-align: center;
    width: 240px;
    margin-top: -50px;
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
  .backToToday {
    font-family: lora;
    color: #4d4d4d;
    text-decoration: underline;
    margin-left: 20px;
    cursor: pointer;
  }
  .backToToday:hover {
    color: rgb(255, 96, 96);
  }
  .deadlines {
    min-height: 160px;
    max-height: 160px;
  }
  .tasksList {
    min-height: 240px;
    max-height: 240px;
    padding: 2px;
    overflow: auto;
    margin-bottom: 15px;
  }
  .deadlinesList {
    width: 94%;
    overflow: auto;
    white-space: nowrap;
    padding: 12px 0px;
  }
  .deadlinesBox {
    border: 1px solid #ccc;
    border-radius: 11px;
    padding: 40px 10px 10px 25px;
    margin: 8px;
  }
  input.checkbox {
    height: 35px;
    width: 15px;
  }
  .sublabel {
    font-family: lora;
    font-size: 18px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 0px;
    margin-top: 12px;
  }

  #deadlineToggle {
    font-family: Lora;
    margin: 0;
    font-size: 12px;
    cursor: pointer;
    /* position: relative; */
    /* left: -77px; */
    top: 20px;
    color: #4d4d4d;
    text-decoration: underline;
  }

  #deadlineToggle:hover {
    color: rgb(255, 96, 96);
  }

  .addTask {
    float: right;
    margin-right: 6%;
    cursor: pointer;
    margin-top: 16px;
  }
  .line {
    height: 1px;
    width: 95%;
    float: left;
    background-color: #ccc;
    border: none;
  }
  .label-container {
    text-align: center;
    color: #34b2c5;
    display: grid;
    min-width: 91%;
    max-width: 91%;
    padding: 10px 20px;
    grid-template-columns: 120px repeat(3, 1fr) 250px;
  }
  .taskLabel {
    font-family: montserrat;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
  }
  .task-container {
    text-align: center;
    align-items: center;
    display: grid;
    min-width: 91%;
    max-width: 91%;
    padding: 10px 20px;
    grid-template-columns: 120px repeat(3, 1fr) 250px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 11px;
    margin-top: 15px;
    background-color: #fff;
    cursor: move;
  }
  .taskText {
    font-family: "Source Sans Pro";
    text-decoration: none;
    font-size: 14px;
    margin: 12px;
  }
  .incompleteText {
    background-color: #ff6060;
    color: #fff;
    margin: 0px 75px;
    border-radius: 5px;
    padding: 3px;
  }
  .completeText {
    background-color: #bedaae;
    color: #fff;
    margin: 0px 75px;
    border-radius: 5px;
    padding: 3px;
  }
  img {
    height: 23px;
    width: auto;
    margin: 8px;
    text-align: center;
    cursor: pointer;
  }
  .tooltip-content {
    font-family: "Source Sans Pro";
    background: white;
    padding: 24px;
    border-radius: 5px;
    border-color: #4d4d4d;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
  }
  /* width */
  ::-webkit-scrollbar {
    height: 6px;
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
  .editBtn {
    display: inline-block;
  }

  /* draggable */
  .flip-list-move {
    transition: transform 0.5s;
  }
  .ghost {
    /* border-left: 4px solid rgb(0,183,255); */
    opacity: 0.3;
  }
  .noTasksToday {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .noTasksToday p {
    font-family: "Lora";
    font-size: 16px;
    letter-spacing: 0.4px;
    color: #0c6472;
    width: 50%;
  }
  .man {
    height: 200px;
    width: auto;
    opacity: 85%;
    margin-left: 30px;
  }
  .signpost {
    height: 260px;
    margin-top: -40px;
    margin-left: 50px;
    opacity: 80%;
  }
</style>
