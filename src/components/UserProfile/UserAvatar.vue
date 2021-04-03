<template>
  <div class="content">
    <div id="avatar">
      <i class="arrow left" v-show="avatarChange" v-on:click="change(0)"></i>
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_1.png"
        v-if="user.imageIdx == 0"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_2.png"
        v-else-if="user.imageIdx == 1"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_3.png"
        v-else-if="user.imageIdx == 2"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_4.png"
        v-else-if="user.imageIdx == 3"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_5.png"
        v-else-if="user.imageIdx == 4"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_6.png"
        v-else-if="user.imageIdx == 5"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_7.png"
        v-else-if="user.imageIdx == 6"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_8.png"
        v-else-if="user.imageIdx == 7"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_9.png"
        v-else-if="user.imageIdx == 8"
      />
      <i class="arrow right" v-show="avatarChange" v-on:click="change(1)"></i>
    </div>
    <span id="avatarChange" v-on:click="toggle()">Change avatar</span>
  </div>
</template>

<script>
  import fb from "../../firebase.js";

  export default {
    data() {
      return {
        avatarChange: false,
        user: {
          name: "",
          email: "",
          DOB: "",
          imageIdx: 0,
          coins: 0,
        },
      };
    },
    methods: {
      toggle: function() {
        if (!this.avatarChange) {
          document.getElementById("avatarChange").textContent =
            "Save as new avatar";
          this.avatarChange = true;
        } else {
          document.getElementById("avatarChange").textContent = "Change avatar";
          this.avatarChange = false;
          this.updateData();
        }
      },
      change: function(x) {
        if (x == 0) {
          if (this.user.imageIdx == 0) {
            this.user.imageIdx = 8;
          } else {
            this.user.imageIdx = this.user.imageIdx - 1;
          }
        } else {
          if (this.user.imageIdx == 8) {
            this.user.imageIdx = 0;
          } else {
            this.user.imageIdx = this.user.imageIdx + 1;
          }
        }
      },
      updateData: function() {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        fb.firestore()
          .collection("users")
          .doc(uid)
          .update({
            user: this.user,
          });
      },
      fetchData: async function() {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        await fb
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.user.name = doc.data().user.name;
            this.user.DOB = doc.data().user.DOB;
            this.user.email = doc.data().user.email;
            this.user.coins = doc.data().user.coins;
            this.user.imageIdx = doc.data().user.imageIdx;
          });
      },
    },
    created: async function() {
      await this.fetchData();
    },
  };
</script>

<style scoped>
  .content {
    margin-bottom: 20px;
  }
  #avatar {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  span {
    margin-top: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: inline;
  }
  .arrow {
    border: solid black;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 3px;
    cursor: pointer;
  }
  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    width: 10px;
    height: 10px;
  }
  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    width: 10px;
    height: 10px;
  }
</style>
