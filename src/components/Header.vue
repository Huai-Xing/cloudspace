<template>
<div>
  <header>
    <!-- <img alt="Cloudspace logo" src="../assets/CloudspaceLogo.png"> -->
    <router-link to="/" exact><img alt="Cloudspace logo" src="../assets/CloudspaceLogo.png"/></router-link>


    <ul class="top-nav-list">
      <li><router-link to="/login" exact> Log In </router-link></li>
      <li><router-link to="/signup" exact> Sign Up </router-link></li>
    </ul>
  </header>
</div>

</template>


<script>
export default {
  data() {
    return {

    }
  }
}
</script>


<style scoped>
header {
  background: #E6F6F3;
  position: absolute; /*Consider removing */
  width: 100%;
  height: 200px;
  left: 0px;
  top: -1px;
  border-bottom-right-radius: 50% 100%;
}

li {
  display: inline;
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
  float: right;
  top: 0px;
}
</style>
