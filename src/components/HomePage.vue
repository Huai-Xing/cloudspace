<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:Data="Data"></appNav>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import fb from "../firebase.js";

  export default {
    props: {
      UID: Number,
      Name: String,
    },
    data() {
      return {
        Data: {
          Name: "",
          UID: "",
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
    mounted() {
      this.Data.UID = this.UID;
    },
    created: async function() {
      await this.fetchData();
    },
  };
</script>

<style scoped></style>
