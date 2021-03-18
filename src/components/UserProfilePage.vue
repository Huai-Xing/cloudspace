<template>
  <div>
    <appNav></appNav>
    <UserAvatar v-bind:ImageIdx="Data.ImageIdx"></UserAvatar>
    <br /><br />
    <UserForm v-bind:Data="Data"></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";
import MainNavigation from './MainNavigation.vue';

export default {
  data() {
    return {
      Data: {
        Name: "",
        Password: "",
        DOB: "",
        Email: "",
        ImageIdx: 0,
      },
    };
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
    appNav: MainNavigation,
  },
  methods: {
    /*
      fetchData: function () {
      database
        .collection("user")
        .doc("UID")
        .get()
        .then((doc) => {
          this.Name = doc.data().Name;
          this.Password = doc.data().Password;
          this.DOB = doc.data().DOB;
          this.Email = doc.data().Email;
          this.ImageIdx = doc.data().ImageIdx;
        });
    },
    */
  },
  created: function () {
    //this.fetchData();
  },
};
</script>


<style scoped>
</style>
