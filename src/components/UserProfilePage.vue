<template>
<div class="content">
  <!-- Side MainNavigation after log in -->
  <div class="column left">
    <app-nav></app-nav>
  </div>

  <!-- UserProfilePage Content -->
  <div class="column right">

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
* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
  height: 1220px; /* for demostration the division works */
}

.left {
  width: 15%;
  background-color: #e6ffff; /* for demostration the division works */
}

.right {
  width: 85%;
  background-color: #ccffff; /* for demostration the division works */
}

/* Clear floats after the columns */
.content:after {
  content: "";
  display: table;
  clear: both;
}
</style>
