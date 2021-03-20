<template>
  <div>
    {{this.ProfileData.Name}}
    <appNav></appNav>
    <UserAvatar v-bind:ImageIdx="Data.ImageIdx"></UserAvatar>
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
        ImageIdx: 0,
        UID: "",
        Name: "",
        Password: "",
        Email: "",
        DOB: "",
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
      this.ProfileData.Password = this.Data.Password;
      this.ProfileData.Email = this.Data.Email;
      this.ProfileData.DOB = this.Data.DOB;
      this.ProfileData.ImageIdx = this.Data.ImageIdx;
      this.ProfileData.UID = this.Data.UID;
    }
  },
};
</script>


<style scoped>
</style>
