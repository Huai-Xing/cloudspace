<template>
  <div id="app">
    <img src="../assets/task/add_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Deadline
      </template>

      <template v-slot:body>
        <form id="new-deadline-form">
          <label for="deadlinetitle">Title</label>
          <input
            v-model="$v.newdeadline.title.$model"
            type="text"
            id="deadlinetitle"
            placeholder="Give your deadline a name"
          />
          <div v-if="$v.newdeadline.title.$dirty">
            <div v-if="!$v.newdeadline.title.required" class="error">
              Title is required
            </div>
          </div>

          <div v-if="!addNewCat">
            <label for="new-deadline-category">Category</label>
            <select v-model="newdeadline.category" id="new-deadline-category">
              <option disabled value=""
                >Please select a category for your deadline</option
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
          </div>
          <div v-if="addNewCat">
            Category
            <input
              id="ndl-newcategory"
              type="text"
              v-model="newdeadline.category"
              placeholder="Enter a new category"
            />
          </div>
          <div v-if="$v.newdeadline.category.$dirty && !addNewCat">
            <div v-if="!$v.newdeadline.category.required" class="error">
              Category is required
            </div>
          </div>
          <div v-if="$v.newdeadline.category.$dirty && addNewCat">
            <div v-if="!$v.newdeadline.category.required" class="error">
              Category is required
            </div>
            <div v-if="!$v.newdeadline.category.doesNotExist" class="error">
              This category already exists!
            </div>
          </div>

          <toggle-button id="switch1" @change="addNewCategory"></toggle-button>
          <!-- <p v-show="errors.category.length">{{ errors.category }}</p> -->
          <br />
          Date Due <input type="date" v-model.trim="newdeadline.datedue" />
          <br />
          Time Due
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="newdeadline.timedue.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
            manual-input
            close-on-complete
            v-model="newdeadline.timedue.mm"
            format="mm"
          ></vue-timepicker>
          min
          <br />
          Show Deadline <input v-model="newdeadline.showInAdvance" /> days in
          advance
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="sendDeadline">
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
        newdeadline: {
          category: "",
          title: "",
          status: "Incomplete",
          timedue: {
            hh: "",
            mm: "",
          },
          datedue: null,
          showInAdvance: 0,
          date: this.taskDate.toDate(),
        },

        user: fb.auth().currentUser.uid,
        categoryList: [],
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
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.resetForm();
        this.isModalVisible = false;
      },
      resetForm() {
        (this.newdeadline = {
          category: "",
          title: "",
          status: "Incomplete",
          timedue: {
            hh: "",
            mm: "",
          },
          date: this.taskDate.toDate(),
        }),
          document.getElementById("new-deadline-form").reset();
        this.$v.$reset();
      },
      sendDeadline() {
        this.$v.$touch();
        //managing newcategories
        if (!this.$v.$invalid) {
          if (this.addNewCat) {
            this.categoryList.push(this.newdeadline.category);
            console.log(this.categoryList);

            fb.firestore()
              .collection("users")
              .doc(this.user)
              .update({
                categoryList: this.categoryList,
              });
          } else;

          console.log(this.newdeadline);

          //adding task to tasksList
          fb.firestore()
            .collection("tasks")
            .doc(this.user)
            .collection("deadlinesList")
            .add(this.newdeadline)
            .then(() => location.reload());

          //close modal and reset values
          this.closeModal();
        } else {
          event.preventDefault();
        }
      },
      addNewCategory: function(value) {
        this.addNewCat = value;
      },
    },

    created() {
      this.fetchCategoryList();
    },
    validations: {
      newdeadline: {
        title: {
          required,
        },
        category: {
          required,
          doesNotExist,
        },
      },
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
  .error {
    color: red;
  }
</style>
