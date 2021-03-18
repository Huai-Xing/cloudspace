<template>
  <div>
    <ul class="top-nav-list">
      <li class="top-nav"><router-link to="/login/signout" exact> Sign Out </router-link></li>
      <li class="top-nav"><router-link to="/login/profile" exact> Profile </router-link></li>
    </ul>
    <div class="left-nav-section">
      <ul class="left-nav-list">
        <li class="left-nav">
          <router-link to="/login/calendar" exact>
            <img src="../assets/nav/nav_calendar.png" />Calendar</router-link
          >
        </li>
        <li class="left-nav">
          <router-link to="/login/productivity" exact
            ><img
              src="../assets/nav/nav_productivity.png"
            />Productivity</router-link
          >
        </li>
        <li class="left-nav">
          <router-link to="/login/tasks" exact
            ><img src="../assets/nav/nav_task.png" />Tasks</router-link
          >
        </li>
        <li class="left-nav">
          <router-link to="/login/plant-tree" exact
            ><img src="../assets/nav/nav_plant.png" />Plant A Tree</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
div {
  float: left;
}
.top-nav-list {
  position: absolute;
  right: 10%;
  top: 2%;
  list-style-type: None;
  margin: 0;
  padding: 0;
}
.top-nav {
  display: inline;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  float: right;
}
.left-nav-section {
  margin-top: 30px;
  padding: 0;
  height: 320px;
  width: 160px;
  border-right: 2px solid black;
  border-top: 1px solid transparent;
}
.left-nav-list {
  list-style-type: None;
  padding: None;
  margin-top: 20px;
}
.left-nav {
  list-style-type: None;
  margin: None;
  padding: 5px 0;
  display: block;
  width: 150px;
  position: relative;
  left: -20px;
}
img {
  position: relative;
  top: 4px;
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
</style>
