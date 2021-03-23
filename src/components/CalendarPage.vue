<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>
</div>
</template>



<script>
import MainNavigation from './MainNavigation.vue';
import CalHeader from './Calendar/CalendarHeader.vue';
import CalCell from './Calendar/CalendarCell.vue';

export default {
  //Register Locally
  components: {
    'appNav': MainNavigation,

  },
}
</script>

<style scoped>

</style>
