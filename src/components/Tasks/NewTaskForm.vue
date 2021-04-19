<template>
  <div id="app">
    <img src="../../assets/task/add1.png" @click="showModal" class="plusBtn" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Task
      </template>

      <template v-slot:body>
        <form id="new-task-form">
          <div class="row">
            <label for="tasktitle">Title</label>
            <input
              v-model="$v.newtask.title.$model"
              type="text"
              id="tasktitle"
              placeholder="Give your task a name"
            />
          </div>
          <div v-if="$v.newtask.title.$dirty">
            <div v-if="!$v.newtask.title.required" class="error">
              Title is required
            </div>
          </div>
          <br />
          <div>
            <div v-if="!addNewCat">
              <label for="new-task-category">Category</label>
              <v-select
                v-model="newtask.category"
                id="new-task-category"
                :options="categoryList"
              >
              </v-select>
            </div>

            <div v-if="addNewCat" class="row">
              <label for="nt-newcategory">Category</label>
              <input
                id="nt-newcategory"
                type="text"
                v-model="newtask.category"
                placeholder="Enter a new category"
              />
            </div>
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
          <toggle-button
            id="switch"
            v-on:change="addNewCategory"
          ></toggle-button>

          <br />
          <label for="duration">
            Duration
          </label>
          <span id="duration">
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="$v.newtask.duration.hh.$model"
              format="HH"
            ></vue-timepicker>
            hr
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="$v.newtask.duration.mm.$model"
              format="mm"
            ></vue-timepicker>
            min
          </span>
          <div v-if="$v.newtask.duration.$dirty">
            <div v-if="!$v.newtask.duration.invalidDuration" class="error">
              Please enter a valid duration
            </div>
            <div v-if="!$v.newtask.duration.minimumDuration" class="error">
              Tasks must be at least 10 minutes long
            </div>
          </div>
          <div v-if="$v.newtask.duration.hh.$dirty">
            <div v-if="!$v.newtask.duration.hh.required" class="error">
              Please enter number of hours
            </div>
          </div>
          <div v-if="$v.newtask.duration.mm.$dirty">
            <div v-if="!$v.newtask.duration.mm.required" class="error">
              Please enter number of minutes
            </div>
          </div>
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
  import Modal from "../Modal";
  import VueTimepicker from "vue2-timepicker";
  import "vue2-timepicker/dist/VueTimepicker.css";
  import fb from "../../firebase";
  import { required } from "vuelidate/lib/validators";
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
    props: {
      taskDate: Object,
      taskCount: Number,
    },
    showModal() {
      this.resetForm();
      this.isModalVisible = true;
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
          index: this.taskCount,
        },

        user: fb.auth().currentUser.uid,
        categoryList: [],
        //toggle showing add new category
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
      handler() {
        event.preventDefault();
      },
      sendTask() {
        this.$v.$touch();

        this.newtask.date = new Date(Date.parse(this.$route.params.date));
        if (!this.$v.$invalid) {
          //managing newcategories
          if (this.addNewCat) {
            // if (!this.categoryList.includes(this.newcategory)) {
            this.categoryList.push(this.newtask.category);

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
    },
  };
</script>

<style scoped>
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

  /* img {
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
  } */
  .error {
    color: red;
  }
</style>
