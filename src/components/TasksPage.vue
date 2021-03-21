<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav v-bind:Data="Data"></appNav>
</div>
</template>



<script>
import MainNavigation from './MainNavigation.vue';

export default {
  props: ['Data'],
  //Register Locally
  components: {
    'appNav': MainNavigation,

  },
}
</script>

<style scoped>
</style>
