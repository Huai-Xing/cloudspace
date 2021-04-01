<template>
  <div id="app">
    <img src="../assets/task/add_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Task
      </template>

      <template v-slot:body>
        <form id="new-task-form">
          <label for="tasktitle">Title</label>
          <input
            v-model.trim="newtask.title"
            type="text"
            id="tasktitle"
            placeholder="Give your task a name"
          />
          <div v-if="!$v.newtask.title.required">
            Field is required
          </div>
          <br />
          <label for="new-task-category">Category</label>
          <select
            v-model="newtask.category"
            :disabled="disabledselect"
            id="new-task-category"
          >
            <option disabled value=""
              >Please select a category for your task</option
            >
            <option
              v-for="option in categoryList"
              v-bind:value="option"
              v-bind:key="option"
            >
              {{ option }}
              <img
                src="../assets/task/trash_btn.png"
                v-on:click="deleteCategory($event)"
              />
            </option>
          </select>
          <br />
          Add a new category
          <input
            id="nt-newcategory"
            type="text"
            v-model="newcategory"
            placeholder="Enter a new category"
            :disabled="disabledinput"
          />
          <!-- <p v-show="errors.category.length">{{ errors.category }}</p> -->
          <br />
          Duration
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="newtask.duration.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="newtask.duration.mm"
            format="mm"
          ></vue-timepicker>
          min
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="sendTask">
          Submit
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
  import { required } from "vuelidate/lib/validators";

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
    },
    props: {
      taskDate: Date,
    },
    data() {
      return {
        isModalVisible: false,
        newtask: {
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
          date: this.taskDate.toDate(),
        },
        newcategory: "",
        disabledselect: false,
        disabledinput: false,
        user: fb.auth().currentUser.uid,
        categoryList: [],
        errors: {
          title: "",
          category: "",
        },
      };
    },
    methods: {
      fetchCategoryList: function() {
        console.log(this.user);
        fb.firestore()
          .collection("users")
          .doc(this.user)
          .get()
          .then((doc) => {
            this.categoryList = doc.data().categoryList;
          });
      },
      showModal() {
        this.resetForm();
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      resetForm() {
        (this.newtask = {
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
          date: this.taskDate.toDate(),
        }),
          (this.newcategory = "");
        document.getElementById("new-task-form").reset();
      },
      sendTask() {
        //managing newcategories
        if (this.newcategory != "") {
          if (!this.categoryList.includes(this.newcategory)) {
            this.categoryList.push(this.newcategory);
            console.log(this.categoryList);
            this.newtask.category = this.newcategory;

            fb.firestore()
              .collection("users")
              .doc(this.user)
              .update({
                categoryList: this.categoryList,
              });
          } else {
            // this.errors.category = "Category already exists";
            alert("Error - this category already exists!");
            event.preventdefault();
          }
        } else;
        console.log(this.newtask);

        //adding task to tasksList
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .add(this.newtask)
          .then(() => location.reload());

        //reset values
        this.isModalVisible = false;
        document.getElementById("new-task-form").reset();
        this.resetForm();
      },
    },
    validations: {
      newtask: {
        title: {
          required,
        },
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
      "newtask.category": function(val) {
        if (val == "") {
          this.disabledinput = false;
        } else {
          this.disabledinput = true;
        }
      },
    },
    created() {
      this.fetchCategoryList();
    },
  };
</script>

<style scoped>
  /* .btn {
    padding: 2px 2px 2px 2px;
  }
  .btn > img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  } */
  img {
    width: 38px;
    height: 38px;
  }
</style>
