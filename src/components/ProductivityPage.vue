<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>
</div>
</template>



<script>
import MainNavigation from './MainNavigation.vue';

export default {
  //Register Locally
  components: {
    'appNav': MainNavigation,

  },
}
</script>

<style scoped>
</style>
