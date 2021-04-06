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
            v-model="$v.updatedtask.title.$model"
            type="text"
            id="title"
            v-bind:placeholder="currentTask.title"
          />
          <div v-if="$v.updatedtask.title.$dirty">
            <div v-if="!$v.updatedtask.title.required" class="error">
              Title is required
            </div>
          </div>
          <br />
          <div v-if="!addNewCat">
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
          </div>
          <div v-if="addNewCat">
            Category
            <input
              id="et-newcategory"
              type="text"
              v-model="updatedtask.category"
              placeholder="Enter a new category"
            />
          </div>
          <div v-if="$v.updatedtask.category.$dirty && !addNewCat">
            <div v-if="!$v.updatedtask.category.required" class="error">
              Category is required
            </div>
          </div>
          <div v-if="$v.updatedtask.category.$dirty && addNewCat">
            <div v-if="!$v.updatedtask.category.required" class="error">
              Category is required
            </div>
            <div v-if="!$v.updatedtask.category.doesNotExist" class="error">
              This category already exists!
            </div>
          </div>

          <toggle-button
            id="switch2"
            v-on:change="addNewCategory"
          ></toggle-button>
          <br />
          Duration
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="updatedtask.duration.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
            manual-input
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
  import { required } from "vuelidate/lib/validators";
  import ToggleButton from "./ToggleButton";

  function doesNotExist(value) {
    return !this.categoryList.includes(value);
  }

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
      ToggleButton,
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
        addNewCat: false,
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
        this.resetForm();
        this.isModalVisible = false;
      },
      updateTask() {
        this.$v.$touch();
        //managing newcategories
        if (!this.$v.$invalid) {
          if (this.addNewCat) {
            this.categoryList.push(this.updatedtask.category);

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

          //close modal and reset values
          this.closeModal();
          console.log("this method works");
        } else {
          event.preventDefault();
        }
      },
      addNewCategory: function(value) {
        console.log(value);
        this.addNewCat = value;
      },
      resetForm() {
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
          // this.isModalVisible = false;
          document.getElementById("edit-task-form").reset();
        this.$v.$reset();
      },
    },
    validations: {
      updatedtask: {
        title: {
          required,
        },
        category: {
          required,
          doesNotExist,
        },
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
  .error {
    color: red;
  }
</style>
