<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <div class="head">
      <p id="welcome">{{ name }}</p>
    </div>
    <quote></quote>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import fb from "../firebase.js";
import quote from "./Quote.vue";

export default {
  data() {
    return {
      name: "",
    };
  },
  //Register Locally
  components: {
    appNav: MainNavigation,
    quote: quote,
  },
  methods: {
    fetchData: async function () {
      var currentUser = fb.auth().currentUser;
      var uid = currentUser.uid;
      await fb
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          this.name = "Hello " + doc.data().user.name;
        });
    },
  },
  created: async function () {
    await this.fetchData();
  },
};
</script>

<style scoped>
.head {
  margin-left: 200px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
#welcome {
  font-size: 28px;
  font-style: italic;
  font-weight: 550;
}
</style>
