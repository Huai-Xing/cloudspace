<template>
  <div>
    <div id="avatar">
      <i class="arrow left" v-show="avatarChange" v-on:click="change(0)"></i>
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_1.png"
        v-if="idx == 0"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_2.png"
        v-else-if="idx == 1"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_3.png"
        v-else-if="idx == 2"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_4.png"
        v-else-if="idx == 3"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_5.png"
        v-else-if="idx == 4"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_6.png"
        v-else-if="idx == 5"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_7.png"
        v-else-if="idx == 6"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_8.png"
        v-else-if="idx == 7"
      />
      <img
        id="avatarIMG"
        src="../../assets/avatar/Avatar_9.png"
        v-else-if="idx == 8"
      />
      <i class="arrow right" v-show="avatarChange" v-on:click="change(1)"></i>
    </div>
    <br />
    <span id="avatarChange" v-on:click="toggle()">Change avatar</span>
  </div>
</template>


<script>
export default {
  props: {
    ImageIdx: Number,
  },
  data() {
    return {
      avatarChange: false,
      idx: this.ImageIdx,
    };
  },
  methods: {
    toggle: function () {
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
    /*
    updateData: function () {
      database.collection("user").doc("UID").update({
        ImageIdx: this.idx;
      }).then(() => {location.reload()});
    },
    */
    change: function (x) {
      if (x == 0) {
        if (this.idx == 0) {
          this.idx = 8;
        } else {
          this.idx = this.idx - 1;
        }
      } else {
        if (this.idx == 8) {
          this.idx = 0;
        } else {
          this.idx = this.idx + 1;
        }
      }
    },
  },
};
</script>


<style scoped>
#avatar {
  align-items: center;
  display: flex;
  justify-content: center;
}
span {
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
