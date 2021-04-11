<template>
<div>
  <appNav></appNav>
  <UserAvatar></UserAvatar>
  <UserForm></UserForm>
</div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";
import MainNavigation from "./MainNavigation.vue";

export default {
  data() {
    return {};
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
    appNav: MainNavigation,
  },
  methods: {},
};
</script>


<style scoped>
</style>
