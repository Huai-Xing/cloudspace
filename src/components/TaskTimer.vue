<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>

    <div class="timer-content">
      <countdown-timer
        v-if="showTimer"
        v-on:switch="switchTimer"
        v-on:end="endTimer"
        v-on:cancel="cancelTimer"
        v-bind:currentTimer="currentTimer"
        :timerTimePassed="timerTimePassed"
        :taskTitle="taskTitle"
        :coin="coin"
      ></countdown-timer>
      <countup-timer
        v-else-if="showBreak"
        v-on:switch="switchTimer"
        v-bind:breakTime="currentBreak"
        :breakTimePassed="breakTimePassed"
        :breakTimeAllowed="breakTimeAllowed"
      ></countup-timer>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import CountDownTimerComponent from "./Timer/CountDownTimerComponent.vue";
import CountUpTimerComponent from "./Timer/CountUpTimerComponent.vue";
import fb from "../firebase.js";

export default {
    props: {
      timeForTask: Number,
      taskId: String,
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
      "countdown-timer": CountDownTimerComponent,
      "countup-timer": CountUpTimerComponent,
    },

    data() {
      return {
        showTimer: true,
        showBreak: false,
        currentBreak: 0,
        currentTimer: 10,
        timerTimePassed: 0,
        breakTimePassed: 0,
        taskTitle: "Cloudspace Timer Task",
        coin: 0,
        breakTimeAllowed: 300,
      };
    },
    methods: {
      switchTimer: function(x, y, z) {
        this.showTimer = !x;
        this.showBreak = x;
        if (x) {
          this.currentTimer = y;
          this.timerTimePassed = z;
        } else {
          this.currentBreak = y;
          this.breakTimePassed = z;
        }
      },
      endTimer: function(x, y, z) {
        //y is amount of time taken to end task after timer is up
        //z is coins
        console.log("complete " + x);
        console.log("extra " + y);
        this.coin = z;
        this.coinPenalty(y);
        this.timerTimePassed = x + y;
        this.updateData("Completed");
      },
      cancelTimer: function() {
        console.log("cancel");
        this.coin = 0;
        this.$router.push({
          name: "Tasks",
        });
      },
      coinPenalty: function(x) {
        var penalty = Math.floor(this.currentBreak / this.breakTimeAllowed);
        if (x > 60) {
          penalty += 1;
        }
        this.coin = Math.max(this.coin - penalty,0);
      },
      updateData: function(x) {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        var localUser;
        fb.firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            localUser = doc.data().user;
          })
          .then(() => {
            localUser.coins = localUser.coins + this.coin;
            fb.firestore()
              .collection("users")
              .doc(uid)
              .update({
                user: localUser,
              });
          });
        fb.firestore()
          .collection("tasks")
          .doc(uid)
          .collection("tasksList")
          .doc(this.taskId)
          .update({
            actualTime: this.timerTimePassed,
            breakTime: this.currentBreak,
            coinsEarned: this.coin,
            status: x,
          })
          .then(() => {
            this.$router.push({
              name: "Tasks",
            });
          });
      },
      convertToSecond: function(x) {
        return x.hh * 3600 + x.mm * 60;
      },
    },

    created() {
      this.currentTimer = this.timeForTask;
      this.coin = Math.floor(this.timeForTask / 600);
      this.breakTimeAllowed = (this.timeForTask / 1200) * 300;
    },
  };
</script>

<style scoped>
  .timer-content {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 150px;
  }
</style>
