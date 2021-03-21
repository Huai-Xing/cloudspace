<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import fb from "../firebase.js";

  export default {
    data() {
      return {
        Data: {
          Name: "",
        },
      };
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
    },
    methods: {
      fetchData: async function() {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        await fb
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.Data.Name = doc.data().name;
          });
      },
    },
    created: async function() {
      await this.fetchData();
    },
  };
</script>

<style scoped></style>
