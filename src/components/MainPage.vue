<template>
<div>
  <ul class="top-nav-list">
    <li>
      <router-link :to="{ name: 'signin' }"> Log In </router-link>
    </li>
    <li>|</li>
    <li>
      <router-link :to="{ name: 'signup' }"> Sign Up </router-link>
    </li>
  </ul>
  <img alt="background1_main" src="../assets/background1_main.png" />
</div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-weight: lighter;
  font-size: 13px;
}

img {
  width: 300px;
  height: 300px;
}

a {
  color: black;
}

ul {
  position: absolute;
  right: 1%;
  top: 2%;
  list-style-type: None;
  margin: 0;
  padding: 0;
}

li {
  font-family: "Lora";
  display: inline;
  font-size: 14px;
  margin-left: 5px;
  margin-right: 5px;
  float: right;
}
</style>
