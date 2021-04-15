<template>
  <div>
    <appNav v-bind:imageIdx="imageIdx"></appNav>
    <UserAvatar v-on:changePic="getImageIdx"></UserAvatar>
    <UserForm></UserForm>
  </div>
</template>

<script>
  import UserForm from "./UserProfile/UserProfileForm.vue";
  import UserAvatar from "./UserProfile/UserAvatar.vue";
  import MainNavigation from "./MainNavigation.vue";

  export default {
    data() {
      return {
        imageIdx: 0,
      };
    },
    components: {
      UserForm: UserForm,
      UserAvatar: UserAvatar,
      appNav: MainNavigation,
    },
    methods: {
      getImageIdx: function(id) {
        this.imageIdx = id;
        console.log(id);
      },
    },
  };
</script>

<style scoped></style>
