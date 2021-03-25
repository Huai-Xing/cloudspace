<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <countdown-timer v-show="showTimer"></countdown-timer>
    <countup-timer v-show="showBreak"></countup-timer>
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
      showTimer: false,
      showBreak: true,
    };
  },

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
