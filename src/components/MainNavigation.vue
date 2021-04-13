<template>
  <div>
    <ul class="top-nav-list">
      <li class="top-nav">
        <span v-on:click.prevent="signout"> Sign Out </span>
      </li>

      <li class="top-nav-left">
        <router-link
          :to="{ name: 'Profile' }"
          @click.native="isActive = 'Profile'"
          v-bind:class="{ active: isActive == 'Profile' }"
          exact
        >
          Profile
        </router-link>
      </li>
    </ul>

    <div class="left-nav-section">
      <ul class="left-nav-list">
        <li class="left-nav">
          <router-link
            :to="{ name: 'Home' }"
            @click.native="isActive = 'Home'"
            v-bind:class="{ active: isActive == 'Home' }"
            exact
          >
            <img src="../assets/nav/nav_home.png" /> Home
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'Calendar' }"
            @click.native="isActive = 'Calendar'"
            v-bind:class="{ active: isActive == 'Calendar' }"
            exact
          >
            <img src="../assets/nav/nav_calendar.png" /> Calendar
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'Productivity' }"
            @click.native="isActive = 'Productivity'"
            v-bind:class="{ active: isActive == 'Productivity' }"
            exact
          >
            <img src="../assets/nav/nav_productivity.png" /> Productivity
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'Tasks', params: { date: this.date.format() }}"
            @click.native="isActive = 'Tasks'"
            v-bind:class="{ active: isActive == 'Tasks' }"
            exact
          >
            <img src="../assets/nav/nav_task.png" /> Tasks
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'PlantTree' }"
            @click.native="isActive = 'PlantTree'"
            v-bind:class="{ active: isActive == 'PlantTree' }"
            exact
          >
            <img src="../assets/nav/nav_plant.png" /> Plant A Tree
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fb from "../firebase";
import dayjs from "dayjs";

export default {
  //props: ["Data"],
  data() {
    return {
      isActive: "",
      date: dayjs()
    };
  },
  /*
  mounted() {
    if (this.Data) {
      this.ProfileData.Name = this.Data.Name;
      this.ProfileData.UID = this.Data.UID;
    }
  },*/
  methods: {
    signout: function () {
      fb.auth()
        .signOut()
        .then(() => {
          alert("You have signed out");
          // console.log("user signed out");
          // console.log("Currently logged in: " + fb.auth().currentUser);
        })
        .catch((error) => {
          alert(error.message);
        })
        .then(() => {
          this.$router.push({
            path: "/",
          });
        });
    },
  },
  created() {
    this.isActive = this.$route.name;
  },
};
</script>

<style scoped>
div {
  float: left;
}
span {
  font-size: 14px;
  color: rgb(209, 5, 5);
  text-decoration: underline;
  cursor: pointer;
}
.top-nav-list {
  font-family: Lora;
  position: absolute;
  right: 1%;
  top: 2%;
  list-style-type: None;
  margin: 0;
  padding: 0;
}
.top-nav {
  display: inline;
  font-size: 14px;
  margin-left: 5px;
  margin-right: 10px;
  float: right;
}
.top-nav-left {
  display: inline;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 5px;
  padding-right: 10px;
  float: right;
  border-right: 2px solid black;
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
  font-family: Lora;
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
a {
  color: black;
  text-decoration: none;
  transition: 0.1s;
}
a:hover,
span:hover {
  font-weight: 600;
  font-size: 15px;
}
.active {
  font-weight: 600;
}
</style>
