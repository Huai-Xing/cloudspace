<template>
  <div id="app">
    <img
      src="../assets/task/edit-col.svg"
      @click="showModal"
      v-tooltip.bottom="'Edit task'"
    />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        You are currently editing: {{ currentTask.category }}-
        {{ currentTask.title }}
      </template>

      <template v-slot:body>
        <form id="edit-task-form">
          <div class="row">
            <label for="title">Title</label>
            <input
              v-model="$v.updatedtask.title.$model"
              type="text"
              id="title"
              placeholder="Enter a new title"
            />
          </div>
          <div v-if="$v.updatedtask.title.$dirty">
            <div v-if="!$v.updatedtask.title.required" class="error">
              Title is required
            </div>
          </div>

          <br />

          <div v-if="!addNewCat">
            <label for="edit-task-category">Category</label>
            <v-select
              v-model="updatedtask.category"
              :disabled="disabledselect"
              id="edit-task-category"
              :options="categoryList"
            >
            </v-select>
          </div>
          <div v-if="addNewCat">
            <label for="et-newcategory">Category</label>
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
          <label id="duration"> Duration </label>
          <span id="duration">
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="$v.updatedtask.duration.hh.$model"
              format="HH"
            ></vue-timepicker>
            hr
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="$v.updatedtask.duration.mm.$model"
              format="mm"
            ></vue-timepicker>
            min
          </span>
          <div v-if="$v.updatedtask.duration.$dirty">
            <div v-if="!$v.updatedtask.duration.invalidDuration" class="error">
              Please enter a valid duration
            </div>
            <div v-if="!$v.updatedtask.duration.minimumDuration" class="error">
              Tasks must be at least 10 minutes long
            </div>
          </div>
          <div v-if="$v.updatedtask.duration.hh.$dirty">
            <div v-if="!$v.updatedtask.duration.hh.required" class="error">
              Please enter number of hours
            </div>
          </div>
          <div v-if="$v.updatedtask.duration.mm.$dirty">
            <div v-if="!$v.updatedtask.duration.mm.required" class="error">
              Please enter number of minutes
            </div>
          </div>
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="updateTask">Update</button>
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
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";

  function doesNotExist(value) {
    if (this.addNewCat) {
      return !this.categoryList.includes(value);
    } else {
      return true;
    }
  }
  function invalidDuration(value) {
    if (value.hh + value.mm == 0) {
      return false;
    } else {
      return true;
    }
  }

  function minimumDuration(value) {
    if (value.hh == 0) {
      return value.mm >= 10;
    } else {
      return true;
    }
  }

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
      ToggleButton,
      vSelect,
    },
    props: ["idname"],

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
            this.updatedtask.title = this.currentTask.title;
            this.updatedtask.category = this.currentTask.category;
            this.updatedtask.duration.hh = this.currentTask.duration.hh;
            this.updatedtask.duration.mm = this.currentTask.duration.mm;
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
              location.reload();
            });

          //close modal and reset values
          this.closeModal();
        } else {
          event.preventDefault();
        }
      },
      addNewCategory: function(value) {
        this.addNewCat = value;
      },
      resetForm() {
        this.updatedtask.title = this.currentTask.title;
        this.updatedtask.category = this.currentTask.category;
        this.updatedtask.duration.hh = this.currentTask.duration.hh;
        this.updatedtask.duration.mm = this.currentTask.duration.mm;
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
        duration: {
          invalidDuration,
          minimumDuration,
          hh: {
            required,
          },
          mm: {
            required,
          },
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
  * {
    font-family: "Source Sans Pro";
    font-size: 12px;
    text-align: left;
  }
  img {
    height: 23px;
    width: auto;
    margin: 8px;
    text-align: center;
    cursor: pointer;
  }
  button {
    font-family: Lora;
    font-size: 12px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    width: 100px;
    padding: 5px 12px 5px 12px;
    margin: 8px;
  }
  button:hover {
    background-color: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  button:active,
  button:focus {
    background-color: #fff;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    transform: translateY(2px);
    outline: none;
  }
  label {
    font-family: Lora;
    font-size: 12px;
    padding-right: 10px;
  }
  .row {
    display: flex;
    padding: 3px;
    align-items: center;
  }
  .required {
    font-family: lora;
    font-size: 10px;
    padding: 10px;
    color: rgb(255, 96, 96);
  }
  input,
  select {
    height: 30px;
    padding-left: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    flex-grow: 1;
    color: rgb(110, 110, 110);
  }
  .v-select {
    /* border: none; */
    height: 30px;
    margin-top: 3px;
  }
  ::placeholder {
    color: rgb(110, 110, 110);
  }
  .time-picker {
    margin: 5px;
  }
  .error {
    color: red;
  }
</style>
