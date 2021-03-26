<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>
    <new-task-form></new-task-form>
    <p>{{ date }}</p>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import NewTaskForm from "./NewTaskForm.vue";
  import dayjs from "dayjs";

  export default {
    //Register Locally
    components: {
      appNav: MainNavigation,
      NewTaskForm,
    },
    data() {
      return {
        date: dayjs(),
      }
    },
    created() {
      var passedDate = this.$route.params.date;
      if (Object.keys(passedDate).length != 0) {
        this.date = passedDate;
      } else {
        this.date = dayjs();
      }
    }
  };
</script>

<style scoped></style>
