<template>
  <div id="app">
    <img
      src="../../assets/task/edit-col.svg"
      @click="showModal"
      v-tooltip.bottom="'Edit deadline'"
    />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        You are currently editing: {{ currentDeadline.category }}-
        {{ currentDeadline.title }}
      </template>

      <template v-slot:body>
        <form id="edit-deadline-form">
          <!-- <div class="row"> -->
          <label for="title">Title</label>
          <input
            v-model="$v.updateddeadline.title.$model"
            type="text"
            id="title"
            placeholder="Enter a new title"
          />
          <!-- </div> -->
          <div v-if="$v.updateddeadline.title.$dirty">
            <div v-if="!$v.updateddeadline.title.required" class="error">
              Title is required
            </div>
          </div>
          <div>
            <div v-if="!addNewCat">
              <label for="edit-task-category">Category</label>
              <v-select
                v-model="updateddeadline.category"
                :disabled="disabledselect"
                id="edit-deadline-category"
                :options="categoryList"
              >
              </v-select>
            </div>

            <div v-if="addNewCat" class="row">
              Category
              <input
                id="et-newcategory"
                type="text"
                v-model="updateddeadline.category"
                placeholder="Enter a new category"
                :disabled="disabledinput"
              />
            </div>
          </div>
          <div v-if="$v.updateddeadline.category.$dirty && !addNewCat">
            <div v-if="!$v.updateddeadline.category.required" class="error">
              Category is required
            </div>
          </div>
          <div v-if="$v.updateddeadline.category.$dirty && addNewCat">
            <div v-if="!$v.updateddeadline.category.required" class="error">
              Category is required
            </div>
            <div v-if="!$v.updateddeadline.category.doesNotExist" class="error">
              This category already exists!
            </div>
          </div>

          <toggle-button id="switch3" @change="addNewCategory"></toggle-button>
          <br />
          <label for="datedue">Date Due</label>
          <input
            id="datedue"
            v-model.trim="updateddeadline.datedue"
            type="date"
          />
          <div v-if="$v.updateddeadline.datedue.$dirty">
            <div v-if="!$v.updateddeadline.datedue.required" class="error">
              Due date is required
            </div>
          </div>
          <br />
          <label for="timedue"> Time Due </label>
          <span id="timedue">
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="updateddeadline.timedue.hh"
              format="HH"
              id="timedue"
            ></vue-timepicker>
            hr
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="updateddeadline.timedue.mm"
              format="mm"
            ></vue-timepicker>
            min
          </span>
          <br />
          <label id="showdl">Show Deadline</label>
          <span id="showdl"
            ><input
              v-model="$v.updateddeadline.showInAdvance.$model"
              placeholder="Please enter a value"
            />
            days in advance
          </span>
          <div v-if="$v.updateddeadline.showInAdvance.$dirty">
            <div
              v-if="!$v.updateddeadline.showInAdvance.required"
              class="error"
            >
              This field is required
            </div>
            <div v-if="!$v.updateddeadline.showInAdvance.numeric" class="error">
              Please enter a valid input
            </div>
            <div
              v-if="!$v.updateddeadline.showInAdvance.maxValue"
              class="error"
            >
              Must be less than 100
            </div>
          </div>
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="updateDeadline">Update</button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "../Modal";
  import VueTimepicker from "vue2-timepicker";
  import "vue2-timepicker/dist/VueTimepicker.css";
  import fb from "../../firebase";
  import { required, numeric, maxValue } from "vuelidate/lib/validators";
  import ToggleButton from "../ToggleButton";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  // import LineChart from './Charts/LineChart.vue';

  function doesNotExist(value) {
    if (this.addNewCat) {
      return !this.categoryList.includes(value);
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
      // LineChart,
    },
    props: ["idname"],

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
          showInAdvance: null,
        },
        addNewCat: false,
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
            this.updateddeadline.title = this.currentDeadline.title;
            this.updateddeadline.datedue = this.currentDeadline.datedue;
            this.updateddeadline.category = this.currentDeadline.category;
            this.updateddeadline.timedue.hh = this.currentDeadline.timedue.hh;
            this.updateddeadline.timedue.mm = this.currentDeadline.timedue.mm;
            this.updateddeadline.showInAdvance = this.currentDeadline.showInAdvance;
          });
      },

      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.resetForm();
        this.isModalVisible = false;
      },

      updateDeadline() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          //managing newcategories
          if (this.addNewCat) {
            this.categoryList.push(this.updateddeadline.category);

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
              location.reload();
              ("test");
              this.updateddeadline;
            });

          //close modal and reset values

          this.closeModal();
        } else {
          event.preventDefault();
        }
      },
      addNewCategory: function(value) {
        123;
        this.addNewCat = value;
      },
      resetForm() {
        this.currentDeadline;
        this.updateddeadline.title = this.currentDeadline.title;
        this.updateddeadline.datedue = this.currentDeadline.datedue;
        this.updateddeadline.category = this.currentDeadline.category;
        this.updateddeadline.timedue.hh = this.currentDeadline.timedue.hh;
        this.updateddeadline.timedue.mm = this.currentDeadline.timedue.mm;
        this.updateddeadline.showInAdvance = this.currentDeadline.showInAdvance;
        this.$v.$reset();
      },
    },

    created() {
      this.fetchCategoryList();
      this.fetchToBeEdited();
      this.idname;
    },
    validations: {
      updateddeadline: {
        title: {
          required,
        },
        category: {
          required,
          doesNotExist,
        },
        datedue: {
          required,
        },
        showInAdvance: {
          required,
          numeric,
          maxValue: maxValue(100),
        },
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: "Source Sans Pro";
    font-size: 12px;
  }
  img {
    height: 23px;
    width: auto;
    margin: 5px;
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
    text-align: center;
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
    align-items: center;
  }
  input,
  select {
    height: 30px;
    padding-left: 8px;
    border: 1px solid #c5c5c5;
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
  .days {
    padding-left: 6px;
  }
  .error {
    color: red;
  }
  /* .vue__time-picker {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 6px;
  font-family: "Source Sans Pro";
} */
</style>
