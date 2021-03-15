<template>
  <div>
    <UserAvatar></UserAvatar>
    <br><br>
    <UserForm></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";

export default {
  data() {
    return {};
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
  },
};
</script>


<style scoped>
</style>
