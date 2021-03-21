<template>
<div>
  <pgHeader>
    <router-link to="/" exact><img alt="Cloudspace logo" src="../assets/CloudspaceLogo.png"/></router-link>


    <ul class="top-nav-list">
      <li><router-link to="/login" exact> Log In </router-link></li>
      <li><router-link to="/signup" exact> Sign Up </router-link></li>
    </ul>
  </pgHeader>

  <!-- LoginPage Content -->
  <div class="login-form">
    <form>
      <h2>Log In</h2>

      <button type="button" v-on:click="logIn()"> Let's go </button>
    </form>
  </div>
  <pgFooter></pgFooter>
</div>
</template>


<script>
//import database from '../firebase.js' //Import database into LogInPage.vue

export default {
  data() {
    return {
    }
  },


  //Register Locally
  components: {

  },


  // mtds
  methods: {
    // Fn to push the user to '/login/calendar' once the Let's go button is clicked
    logIn: function() {
      // to push user to '/login/calendar'
      this.$router.push({path: '/login/calendar'});

      // Other logic (retriving details from firebase for the specific user?) here

    },
  },

}
</script>


<style scoped>

</style>
