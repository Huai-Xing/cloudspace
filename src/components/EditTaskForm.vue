<template>
  <div id="app">
    <img src="../assets/task/edit_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        You are currently editing: {{ currentTask.category }}-
        {{ currentTask.title }}
      </template>

      <template v-slot:body>
        <form id="edit-task-form">
          <label for="title">Title</label>
          <input
            v-model="updatedtask.title"
            type="text"
            id="title"
            v-bind:placeholder="currentTask.title"
          />
          <br />
          <label for="edit-task-category">Category</label>
          <select
            v-model="updatedtask.category"
            :disabled="disabledselect"
            id="edit-task-category"
          >
            <option disabled value=""
              >Please select a new catergory for your task</option
            >
            <option
              v-for="option in categoryList"
              v-bind:value="option"
              v-bind:key="option"
            >
              {{ option }}
            </option>
          </select>
          <br />
          Add a new category
          <input
            id="et-newcategory"
            type="text"
            v-model="newcategory"
            placeholder="Enter a new category"
            :disabled="disabledinput"
          />
          <br />
          Duration
          <vue-timepicker
            close-on-complete
            v-model="updatedtask.duration.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
            close-on-complete
            v-model="updatedtask.duration.mm"
            format="mm"
          ></vue-timepicker>
          min
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="updateTask">
          Update
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal";
  import VueTimepicker from "vue2-timepicker";
  import "vue2-timepicker/dist/VueTimepicker.css";
  import fb from "../firebase";

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
    },
    props: {
      idname: String,
    },
    data() {
      return {
        isModalVisible: false,
        updatedtask: {
          category: "",
          title: "",
          duration: {
            hh: "",
            mm: "",
          },
          breakTime: 0,
          actualTime: 0,
          coinsEarned: 0,
        },
        newcategory: "",
        disabledselect: false,
        disabledinput: false,
        user: fb.auth().currentUser.uid,
        categoryList: [],
        currentTask: [],
      };
    },
    methods: {
      fetchCategoryList: function() {
        fb.firestore()
          .collection("users")
          .doc(this.user)
          .get()
          .then((doc) => {
            this.categoryList = doc.data().categoryList;
          });
      },
      fetchToBeEdited: function() {
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .doc(this.idname)
          .get()
          .then((doc) => {
            this.currentTask = doc.data();
            this.updatedtask = doc.data();
          });
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      updateTask() {
        //managing newcategories
        if (this.newcategory != "") {
          this.categoryList.push(this.newcategory);

          this.updatedtask.category = this.newcategory;

          fb.firestore()
            .collection("users")
            .doc(this.user)
            .update({
              categoryList: this.categoryList,
            });
        } else;

        //updating task to tasksList
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .doc(this.idname)
          .update(this.updatedtask)
          .then(() => {
            this.isModalVisible = false;
            location.reload();
          });

        //reset values
        (this.updatedtask = {
          category: "",
          title: "",
          status: "Incomplete",
          duration: {
            hh: "",
            mm: "",
          },
          breakTime: 0,
          actualTime: 0,
          coinsEarned: 0,
        }),
          (this.newcategory = "");
        // this.isModalVisible = false;
        document.getElementById("edit-task-form").reset();
        console.log("this method works");
      },
    },
    watch: {
      newcategory: function(val) {
        if (val == "") {
          this.disabledselect = false;
        } else {
          this.disabledselect = true;
        }
      },
      "updatedtask.category": function(val) {
        if (val == "") {
          this.disabledinput = false;
        } else {
          this.disabledinput = true;
        }
      },
    },
    created() {
      this.fetchCategoryList();
      this.fetchToBeEdited();
    },
  };
</script>

<style scoped>
  img {
    height: 28px;
    width: auto;
    margin: 2px;
    text-align: center;
  }
</style>
