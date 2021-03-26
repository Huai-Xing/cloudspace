<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <new-task-form></new-task-form>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import NewTaskForm from "./NewTaskForm.vue";

  export default {
    //Register Locally
    components: {
      appNav: MainNavigation,
      NewTaskForm,
    },
  };
</script>

<style scoped>
</style>
