<template>
<div id="app">
  <pgHeader></pgHeader>
  <router-view></router-view>
  <!-- Track Authentication Status -->
  <auth-status></auth-status>

  <pgFooter></pgFooter>
</div>
</template>

<script>
import AuthStatus from "./components/AuthStatus.vue";
//Register Locally

export default {
  data() {
    return {};
  },
  // mtds
  methods: {},
  //Register Locally
  components: {
    AuthStatus,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lora|Roboto");
</style>
