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
            v-model="$v.newtask.title.$model"
            type="text"
            id="tasktitle"
            placeholder="Give your task a name"
          />
          <div v-if="$v.newtask.title.$dirty">
            <div v-if="!$v.newtask.title.required" class="error">
              Title is required
            </div>
          </div>

          <br />
          <div v-if="!addNewCat">
            <label for="new-task-category">Category</label>
            <select v-model="newtask.category" id="new-task-category">
              <option disabled value="">Choose an existing category</option>
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
          </div>

          <div v-if="addNewCat">
            Category
            <input
              id="nt-newcategory"
              type="text"
              v-model="newtask.category"
              placeholder="Enter a new category"
            />
          </div>
          <div v-if="$v.newtask.category.$dirty && !addNewCat">
            <div v-if="!$v.newtask.category.required" class="error">
              Category is required
            </div>
          </div>
          <div v-if="$v.newtask.category.$dirty && addNewCat">
            <div v-if="!$v.newtask.category.required" class="error">
              Category is required
            </div>
            <div v-if="!$v.newtask.category.doesNotExist" class="error">
              This category already exists!
            </div>
          </div>
          <toggle-button id="switch" @change="addNewCategory"></toggle-button>

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
      taskDate: Object,
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

        user: fb.auth().currentUser.uid,
        categoryList: [],
        //toggle showing add new category
        addNewCat: false,
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
        console.log(this.categoryList);
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.resetForm();
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
          (this.addNewCat = false);
        document.getElementById("new-task-form").reset();
        //resetting validation
        this.$v.$reset();
      },
      sendTask() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          //managing newcategories
          if (this.addNewCat) {
            // if (!this.categoryList.includes(this.newcategory)) {
            this.categoryList.push(this.newtask.category);
            console.log(this.categoryList);

            fb.firestore()
              .collection("users")
              .doc(this.user)
              .update({
                categoryList: this.categoryList,
              });
          } else;
          console.log("test");
          console.log(this.newtask);

          //adding task to tasksList
          fb.firestore()
            .collection("tasks")
            .doc(this.user)
            .collection("tasksList")
            .add(this.newtask)
            .then(() => location.reload());

          //close modal and reset values
          this.closeModal();
        } else {
          event.preventDefault();
        }
      },
      addNewCategory: function(value) {
        console.log(value);
        this.addNewCat = value;
      },
    },
    validations: {
      newtask: {
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
    },
  };
</script>

<style scoped>
  img {
    width: 38px;
    height: 38px;
  }
  button {
    font-family: Lora;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    width: 100px;
    padding: 5px 12px 5px 12px;
  }
  .error {
    color: red;
  }
</style>
