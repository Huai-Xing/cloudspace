<template>
  <div>
    <ul class="top-nav-list">
      <li><router-link to="/login" exact> Log In </router-link></li>
      <li><router-link to="/signup" exact> Sign Up </router-link></li>
    </ul>
    <img alt="background1_main" src="../assets/background1_main.png" />
  </div>
</template>


<script>

export default {
};
</script>


<style scoped>
img {
  width: 300px;
  height: 300px;
}
ul {
  position: absolute;
  right: 10%;
  top: 2%;
  list-style-type: None;
  margin: 0;
  padding: 0;
}
li {
  display: inline;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  float: right;
}
</style>
