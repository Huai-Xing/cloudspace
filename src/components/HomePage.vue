<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:Data="Data"></appNav>
  </div>
</template>



<script>
import MainNavigation from "./MainNavigation.vue";
import firebase from "../firebase.js";

export default {
  props: {
    UID: Number,
    Name: String,
  },
  data() {
    return {
      Data: {
        Name: "ASD",
        Password: "",
        Email: "",
        DOB: "",
        ImageIdx: 0,
        UID: "",
      },
    };
  },
  //Register Locally
  components: {
    appNav: MainNavigation,
  },
  methods: {
    fetchData: async function () {
      await firebase
        .firestore()
        .collection("users")
        .doc("MXJkiPOhxkMRofWdFxIMJUcSCTb2")
        .get()
        .then((doc) => {
          this.Data.Name = doc.data().name;
          this.Data.Password = doc.data().password;
          this.Data.DOB = doc.data().DOB;
          this.Data.Email = doc.data().email;
          this.Data.ImageIdx = doc.data().ImageIdx;
        });
    },
  },
  mounted() {
    this.Data.UID = this.UID;
  },
  created: async function() {
      await this.fetchData();
  }
};
</script>

<style scoped>
</style>
