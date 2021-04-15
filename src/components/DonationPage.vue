<template>
  <div>
    <main-navigation v-bind:imageIdx="imageIdx"></main-navigation>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  export default {
    components: { MainNavigation },
    data() {
      return {
        imageIdx: this.$route.params.image,
      };
    },
  };
</script>

<style></style>

MainNavigation
