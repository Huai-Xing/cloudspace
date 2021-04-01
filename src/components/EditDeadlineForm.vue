<template>
  <div id="app">
    <img src="../assets/task/edit_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        You are currently editing: {{ currentDeadline.category }}-
        {{ currentDeadline.title }}
      </template>

      <template v-slot:body>
        <form id="edit-deadline-form">
          <label for="title">Title</label>
          <input
            v-model="updateddeadline.title"
            type="text"
            id="title"
            v-bind:placeholder="currentDeadline.title"
          />
          <br />
          <label for="edit-task-category">Category</label>
          <select
            v-model="updateddeadline.category"
            :disabled="disabledselect"
            id="edit-deadline-category"
          >
            <option disabled value=""
              >Please select a new catergory for your deadline</option
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
          Date Due <input type="date" v-model.trim="updateddeadline.datedue" />
          <br />
          Time Due
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="updateddeadline.timedue.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="updateddeadline.timedue.mm"
            format="mm"
          ></vue-timepicker>
          min
          <br />
          Show Deadline <input v-model="updateddeadline.showInAdvance" /> days
          in advance
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="updateDeadline">
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
        updateddeadline: {
          category: "",
          title: "",
          status: "Incomplete",
          timedue: {
            hh: "",
            mm: "",
          },
          datedue: null,
          showInAdvance: 0,
        },
        newcategory: "",
        disabledselect: false,
        disabledinput: false,
        user: fb.auth().currentUser.uid,
        categoryList: [],
        currentDeadline: [],
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
          .collection("deadlinesList")
          .doc(this.idname)
          .get()
          .then((doc) => {
            this.currentDeadline = doc.data();
            this.updateddeadline = doc.data();
          });
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      updateDeadline() {
        //managing newcategories
        if (this.newcategory != "") {
          this.categoryList.push(this.newcategory);

          this.updateddeadline.category = this.newcategory;

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
          .collection("deadlinesList")
          .doc(this.idname)
          .update(this.updateddeadline)
          .then(() => {
            this.isModalVisible = false;
            location.reload();
          });

        //reset values
        (this.updateddeadline = {
          category: "",
          title: "",
          status: "Incomplete",
          duration: {
            hh: "",
            mm: "",
          },
        }),
          (this.newcategory = "");
        // this.isModalVisible = false;
        document.getElementById("edit-deadline-form").reset();
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
      "updateddeadline.category": function(val) {
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
