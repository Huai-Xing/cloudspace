<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>

    <!-- Tasks -->
    To Do: <new-task-form></new-task-form>
    <table>
      <tr>
        <th>Category</th>
        <th>Title</th>
        <th>Time allocated</th>
        <th>Status</th>
      </tr>
      <tr v-for="(task, index) in tasks" v-bind:key="index">
        <td>{{ task[1].category }}</td>
        <td>{{ task[1].title }}</td>
        <td>{{ task[1].duration }}</td>
        <td>{{ task[1].status }}</td>

        <!-- Incomplete status -->
        <div v-if="task[1].status == 'incomplete'">
          <button>Start task</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <!-- Complete status -->
        <div v-if="task[1].status == 'complete'">
          <button>More Info</button>
          <button>Delete</button>
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
  import fb from "../firebase";
  import MainNavigation from "./MainNavigation.vue";
  import NewTaskForm from "./NewTaskForm.vue";

  export default {
    data() {
      return {
        user: fb.auth().currentUser.uid,
        tasks: [],
      };
    },
    //Register Locally
    components: {
      appNav: MainNavigation,
      NewTaskForm,
    },
    methods: {
      fetchTasks: function() {
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.tasks.push([doc.id, doc.data()]);
            });
          });
      },
    },
    created() {
      this.fetchTasks();
    },
  };
</script>

<style scoped></style>
