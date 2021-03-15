<template>
  <div>
      <p><i class="arrow left"></i></p>
      <img id="avatarIMG" src="../assets/avatar/Avatar_1.png" />
      <p><i class="arrow right"></i></p>
    <br />
    <span id="AvatarChange" v-on:click="toggle()">Change avatar</span>
    <UserForm></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";

export default {
  data() {
    return {
      images: [
        "../assets/avatar/Avatar_1.png",
        "../assets/avatar/Avatar_2.png",
        "../assets/avatar/Avatar_3.png",
        "../assets/avatar/Avatar_4.png",
        "../assets/avatar/Avatar_5.png",
        "../assets/avatar/Avatar_6.png",
        "../assets/avatar/Avatar_7.png",
        "../assets/avatar/Avatar_8.png",
        "../assets/avatar/Avatar_9.png",
      ],
    };
  },
  components: {
    UserForm: UserForm,
  },
};
</script>


<style scoped>
div {
  align-items: center;
  display: f    lex;
  justify-content: center;
}
img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: inline;
}
span {
  text-decoration: underline;
}
.arrow {
  border: solid black;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;
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
#avatar {
  align-content: center;
}
</style>
