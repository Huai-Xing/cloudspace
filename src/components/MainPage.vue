<template>
  <div>
    <ul class="top-nav-list">
      <li><router-link :to="{ name: 'signin' }"> Log In </router-link></li>
      <li>|</li>
      <li><router-link :to="{ name: 'signup' }"> Sign Up </router-link></li>
    </ul>
    <div class="img_stack">
      <img
        id="img_top"
        alt="background1_main"
        src="../assets/background1_main.png"
      />
      <img id="img_bottom" alt="box" src="../assets/lines_box.png" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-weight: lighter;
  font-size: 13px;
  box-sizing: border-box;
}

img {
  width: 350px;
  height: auto;
}

#img_top {
  grid-row: 1;
  grid-column: 1 / span 8;
  z-index: 1;
}

#img_bottom {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}

.img_stack {
  display: grid;
  grid-template-columns: 250px;
  grid-template-rows: 100px;
  position: relative;
  grid-auto-rows: 5;
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
