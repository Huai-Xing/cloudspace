<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <countdown-timer v-if="showTimer" v-on:switch="switchTimer" v-on:end="endTimer" v-on:cancel="cancelTimer" v-bind:currentTimer="currentTimer" :timerTimePassed="timerTimePassed" :taskTitle="taskTitle"></countdown-timer>
    <countup-timer v-else-if="showBreak" v-on:switch="switchTimer" v-bind:breakTime="currentBreak" :breakTimePassed="breakTimePassed"></countup-timer>
  </div>

</div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import CountDownTimerComponent from './Timer/CountDownTimerComponent.vue';
import CountUpTimerComponent from './Timer/CountUpTimerComponent.vue';

export default {
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
      currentTimer: 3600,
      timerTimePassed: 0,
      breakTimePassed: 0,
      taskTitle: "Task",
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
  }

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
