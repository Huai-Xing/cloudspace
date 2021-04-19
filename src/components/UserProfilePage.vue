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
        imageIdx: this.$route.params.image,
      };
    },
    components: {
      UserForm: UserForm,
      UserAvatar: UserAvatar,
      appNav: MainNavigation,
    },
    methods: {
      getImageIdx: function(id, reload) {
        this.imageIdx = id;
        if (reload) {
          location.reload();
        }
      },
    },
  };
</script>

<style scoped></style>
