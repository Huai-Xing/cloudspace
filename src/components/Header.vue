<template>
<div>
  <header>
    <!-- <img alt="Cloudspace logo" src="../assets/CloudspaceLogo.png"> -->
    <img id="head" src="../assets/header.png"/>
    <img id="logo" v-on:click="changeRoute" alt="Cloudspace logo" src="../assets/CloudspaceLogo.png"/>

  </header>
</div>

</template>
 
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    changeRoute: function() {
      if (this.$route.name == "signin") {
        this.$router.push({ name: "Main" });
      } else if (this.$route.name == "Main") {
        location.reload();
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  }
}
</script>


<style scoped>
#head {
  display: flex;
  width: 100%;
  height: 120px;
  position: absolute;
  left: 0px;
  top: -1px;
  z-index: -1;
}
#logo {
  display: flex;
  width: 100px;
  height: 100px;
}
</style>
