<template>
  <div>
    <appNav></appNav>
    <UserAvatar v-bind:ImageIdx="ImageIdx"></UserAvatar>
    <UserForm v-bind:UID="UID"></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";
import MainNavigation from './MainNavigation.vue';

export default {
  data() {
    return {
      ImageIdx: 0,
      UID: "",
    };
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
    appNav: MainNavigation,
  },
  methods: {
  },
};
</script>


<style scoped>
</style>
