<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <countdown-timer></countdown-timer>
    <countup-timer></countup-timer>
  </div>

</div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import CountDownTimerComponent from './CountDownTimerComponent.vue';
import CountUpTimerComponent from './CountUpTimerComponent.vue';

export default {
  //Register Locally
  components: {
    'appNav': MainNavigation,
    'countdown-timer': CountDownTimerComponent,
    'countup-timer': CountUpTimerComponent,
  },

  data() {
    return {

    };
  },

}
</script>


<style scoped>
.timer-content {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
</style>
