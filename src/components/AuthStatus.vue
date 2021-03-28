<template>
<div></div>
</template>

<script>
import fb from "../firebase";
export default {
  methods: {
    statechange: function() {
      fb.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("Current user: " + user.uid);
        } else {
          console.log("Current user: " + null);
        }
      });
    },
  },
  created() {
    this.statechange();
  },
};
</script>
