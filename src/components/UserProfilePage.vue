<template>
  <div>
    <appNav v-bind:Data="Data"></appNav>
    <UserAvatar></UserAvatar>
    <UserForm v-bind:Data="Data"></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";
import MainNavigation from "./MainNavigation.vue";

export default {
  props: ["Data"],
  data() {
    return {
      ProfileData: {
        UID: "",
        Name: "",
      },
    };
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
    appNav: MainNavigation,
  },
  methods: {},
  mounted() {
    if (this.Data) {
      this.ProfileData.Name = this.Data.Name;
      this.ProfileData.UID = this.Data.UID;
    }
  },
};
</script>


<style scoped>
</style>
