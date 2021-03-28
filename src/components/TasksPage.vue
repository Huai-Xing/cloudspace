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
      <tr v-for="task in tasks" v-bind:key="task[0]">
        <td>{{ task[1].category }}</td>
        <td>{{ task[1].title }}</td>
        <td>{{ task[1].duration }}</td>
        <td>{{ task[1].status }}</td>

        <!-- Incomplete status -->
        <div v-if="task[1].status == 'incomplete'">
          <button>Start task</button>
          <edit-form v-bind:idname="task[0]"></edit-form>
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
  import EditForm from "./EditForm.vue";
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
      EditForm,
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
      // editTask: function() {
      //   var doc_id = event.target.getAttribute("id");
      //   this.$emit("edit", doc_id);
      // },
    },
    created() {
      this.fetchTasks();
    },
  };
</script>

<style scoped></style>
