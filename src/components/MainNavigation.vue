<template>
  <div>
    <ul class="top-nav-list">
      <li class="top-nav">
        <span v-on:click.prevent="signout">
          <img src="../assets/nav/nav_signout.png" class="signout_btn" />
        </span>
      </li>

      <li class="top-nav-left">
        <router-link
          :to="{ name: 'Profile' }"
          @click.native="isActive = 'Profile'"
          v-bind:class="{ active: isActive == 'Profile' }"
          exact
        >
          <img :src="getImageURL(imageid)" class="profile_btn" />
        </router-link>
      </li>
    </ul>

    <div class="left-nav-section">
      <ul class="left-nav-list">
        <li class="left-nav">
          <router-link
            :to="{ name: 'Home', params: { image: imageIdx } }"
            @click.native="isActive = 'Home'"
            v-bind:class="{ active: isActive == 'Home' }"
            exact
          >
            <img src="../assets/nav/nav_home.png" /> Home
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'Calendar', params: { image: imageIdx } }"
            @click.native="isActive = 'Calendar'"
            v-bind:class="{ active: isActive == 'Calendar' }"
            exact
          >
            <img src="../assets/nav/nav_calendar.png" /> Calendar
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'Productivity', params: { image: imageIdx } }"
            @click.native="isActive = 'Productivity'"
            v-bind:class="{ active: isActive == 'Productivity' }"
            exact
          >
            <img src="../assets/nav/nav_productivity.png" /> Productivity
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{
              name: 'Tasks',
              params: { date: this.date.format(), image: imageIdx },
            }"
            @click.native="isActive = 'Tasks'"
            v-bind:class="{ active: isActive == 'Tasks' }"
            exact
          >
            <img src="../assets/nav/nav_task.png" /> Tasks
          </router-link>
        </li>

        <li class="left-nav">
          <router-link
            :to="{ name: 'PlantTree', params: { image: imageIdx } }"
            @click.native="isActive = 'PlantTree'"
            v-bind:class="{ active: isActive == 'PlantTree' }"
            exact
          >
            <img src="../assets/nav/nav_plant.png" /> Plant A Tree
          </router-link>
        </li>
        <li class="left-nav">
          <router-link
            :to="{ name: 'Donate', params: { image: imageIdx } }"
            @click.native="isActive = 'Donate'"
            v-bind:class="{ active: isActive == 'Donate' }"
            exact
          >
            <img src="../assets/nav/nav_donate.png" /> Donate
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
    props: ["imageIdx"],
    data() {
      return {
        isActive: "",
        date: dayjs(),
        user: fb.auth().currentUser.uid,
        imageid: this.imageIdx,
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
      signout: function() {
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
      getImageURL: function(avatar) {
        var val = avatar + 1;
        console.log(val);
        return require("../assets/avatar/Avatar_" + val + ".png");
      },

      // getImageIdx: function() {
      //   if (this.imageIdx === undefined) {
      //     return this.getImageURL(this.imageid);
      //   } else {
      //     return this.getImageURL(this.imageIdx);
      //   }
      // },

      // fetchAvatar: function() {
      //   fb.firestore()
      //     .doc(this.user)
      //     .get()
      //     .then((doc) => {
      //       this.imageIdx = doc.data().user.imageIdx;
      //     });
      // },
    },
    created() {
      this.isActive = this.$route.name;
      if (this.imageIdx === undefined) {
        console.log("test");
        fb.firestore()
          .collection("users")
          .doc(this.user)
          .get()
          .then((doc) => {
            this.imageid = doc.data().user.imageIdx;
          });
      }
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
    margin-left: 0px;
    margin-right: 0px;
    padding-right: 0px;
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
    margin-right: -4px;
  }
  a:hover,
  span:hover {
    font-weight: 600;
  }
  .active {
    font-weight: 600;
  }
  .signout_btn:hover {
    filter: invert(19%) sepia(71%) saturate(7394%) hue-rotate(357deg)
      brightness(103%) contrast(117%);
  }
  .signout_btn {
    margin-top: -10px;
  }
  .profile_btn {
    margin-top: -10px;
  }
</style>
