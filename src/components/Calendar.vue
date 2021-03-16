<template>
<div id="content">
  <div id="left">
    <app-nav></app-nav>
  </div>

  <div id="right">

  </div>

</div>
</template>



<script>
import MainNavigation from './MainNavigation.vue';

export default {
  //Register Locally
  components: {
    'app-nav': MainNavigation,

  },
}
</script>

<style scoped>
#content {
   width: 500px;
   height: 500px;
   padding: 20px;
}

#left {
  display: inline-block;
  width: 20%;
  height: 100%;
  margin-right: 50px;
}

#right {
  display: inline-block;
  width: 80%;
  height: 100%;
}
</style>
