<template>
  <div id="app">
    <img src="../../assets/task/add1.png" @click="showModal" class="plusBtn" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Deadline
      </template>

      <template v-slot:body>
        <form id="new-deadline-form">
          <div class="row">
            <label for="deadlinetitle">Title</label>
            <input
              v-model="$v.newdeadline.title.$model"
              type="text"
              id="deadlinetitle"
              placeholder="Give your deadline a name"
            />
          </div>
          <div v-if="$v.newdeadline.title.$dirty">
            <div v-if="!$v.newdeadline.title.required" class="error">
              Title is required
            </div>
          </div>
          <div>
            <div v-if="!addNewCat">
              <label for="new-deadline-category">Category</label>
              <v-select
                v-model="newdeadline.category"
                id="new-deadline-category"
                class="categoryDropdown"
                :options="categoryList"
              >
              </v-select>
            </div>
            <div v-if="addNewCat" class="row">
              <label for="ndl-newcategory">Category</label>
              <input
                id="ndl-newcategory"
                type="text"
                v-model="newdeadline.category"
                placeholder="Enter a new category"
              />
            </div>
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

          <br />
          <label for="datedue">Date Due</label>
          <input type="date" v-model.trim="newdeadline.datedue" id="datedue" />
          <div v-if="$v.newdeadline.datedue.$dirty">
            <div v-if="!$v.newdeadline.datedue.required" class="error">
              Due date is required
            </div>
          </div>
          <br />
          <label for="timedue">
            Time Due
          </label>
          <span id="timedue">
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
          </span>
          <br />
          <label id="showdl">Show Deadline</label>
          <span>
            <input
              id="showdl"
              v-model="$v.newdeadline.showInAdvance.$model"
              placeholder="0"
            />
            days in advance
          </span>
          <div v-if="$v.newdeadline.showInAdvance.$dirty">
            <div v-if="!$v.newdeadline.showInAdvance.required" class="error">
              This field is required
            </div>
            <div v-if="!$v.newdeadline.showInAdvance.numeric" class="error">
              Please enter a valid input
            </div>
            <div v-if="!$v.newdeadline.showInAdvance.maxValue" class="error">
              Must be less than 100
            </div>
          </div>
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
  import Modal from "../Modal";
  import VueTimepicker from "vue2-timepicker";
  import "vue2-timepicker/dist/VueTimepicker.css";
  import fb from "../../firebase";
  import { required, numeric, maxValue } from "vuelidate/lib/validators";
  import ToggleButton from "../ToggleButton";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";

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
          showInAdvance: null,
          date: this.taskDate.toDate(),
        },

        user: fb.auth().currentUser.uid,
        categoryList: [],
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

            fb.firestore()
              .collection("users")
              .doc(this.user)
              .update({
                categoryList: this.categoryList,
              });
          } else;

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
  /* .btn {
    padding: 2px 2px 2px 2px;
  }
  .btn > img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  } */
  * {
    font-family: "Source Sans Pro";
    font-size: 12px;
  }
  .plusBtn {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    height: 22px;
    width: 22px;
    padding: 5px;
  }
  .plusBtn:hover,
  .plusBtn:active {
    box-shadow: inset 0px 0px 2px #c1c1c1;
    transform: translateY(4px);
    outline: none;
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
  .days {
    padding-left: 6px;
  }
  .error {
    color: red;
  }
</style>
