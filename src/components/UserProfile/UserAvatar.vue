<template>
  <div>
    <div id="avatar">
      <i class="arrow left"></i>
      <img id="avatarIMG" src="../../assets/avatar/Avatar_1.png" />
      <i class="arrow right"></i>
    </div>
    <br>
    <span id="AvatarChange" v-on:click="toggle()">Change avatar</span>
  </div>
</template>


<script>

export default {
  data() {
    return {
      images: [
        "../../assets/avatar/Avatar_1.png",
        "../../assets/avatar/Avatar_2.png",
        "../../assets/avatar/Avatar_3.png",
        "../../assets/avatar/Avatar_4.png",
        "../../assets/avatar/Avatar_5.png",
        "../../assets/avatar/Avatar_6.png",
        "../../assets/avatar/Avatar_7.png",
        "../../assets/avatar/Avatar_8.png",
        "../../assets/avatar/Avatar_9.png",
      ],
    };
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
