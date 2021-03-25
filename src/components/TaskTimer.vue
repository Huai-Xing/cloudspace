<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <countdown-timer v-if="showTimer" v-on:switch="switchTimer" v-on:end="endTimer" v-on:cancel="cancelTimer" v-bind:currentTimer="currentTimer" :timerTimePassed="timerTimePassed" :taskTitle="taskTitle"></countdown-timer>
    <countup-timer v-else-if="showBreak" v-on:switch="switchTimer" v-bind:breakTime="currentBreak" :breakTimePassed="breakTimePassed" :breakTimeAllowed="breakTimeAllowed"></countup-timer>
  </div>

</div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import CountDownTimerComponent from './Timer/CountDownTimerComponent.vue';
import CountUpTimerComponent from './Timer/CountUpTimerComponent.vue';

export default {
  /*
  props: {
    timeForTask: Number,
    coinForTask: Number,
  },*/
  //Register Locally
  components: {
    'appNav': MainNavigation,
    'countdown-timer': CountDownTimerComponent,
    'countup-timer': CountUpTimerComponent,
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
    switchTimer: function(x,y,z) {
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
    endTimer: function() {
      console.log("complete");
      this.$router.push({
        name: 'Tasks',
      });
    },
    cancelTimer: function() {
      console.log("cancel");
      this.$router.push({
        name: 'Tasks',
      });
    },
    coinPenalty: function() {
      var penalty = Math.floor(this.currentBreak / this.breakTimeAllowed);
      return penalty;
    },
  },
  /*
  mounted() {
    this.currentTimer = this.timeForTask;
    this.coin = this.coinForTask;
    this.breakTimeAllowed = (this.timeForTask / 1200) * 300
  }*/

}
</script>


<style scoped>
.timer-content {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
}
</style>
