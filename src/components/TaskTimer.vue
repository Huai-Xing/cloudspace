<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <countdown-timer></countdown-timer>
  </div>

</div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import CountDownTimerComponent from './CountDownTimerComponent.vue';

export default {
  //Register Locally
  components: {
    'appNav': MainNavigation,
    'countdown-timer': CountDownTimerComponent,
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
