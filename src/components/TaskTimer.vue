<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <div class="timer-content">
    <timer-Comp></timer-Comp>
  </div>

</div>
</template>


<script>
import MainNavigation from './MainNavigation.vue';
import TimerComponent from './TimerComponent.vue';

export default {
  //Register Locally
  components: {
    'appNav': MainNavigation,
    'timer-Comp': TimerComponent,
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
