<template>
  <div id="app">
    <img src="../assets/task/add_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> Add a New Task </template>

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
            <div v-if="!addNewCat" >
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
          <toggle-button id="switch" v-on:change="addNewCategory"></toggle-button>

          <br />
          <!-- <p v-show="errors.category.length">{{ errors.category }}</p> -->

          <div class="row">
            <label for="time-picker">Duration</label>
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="newtask.duration.hh"
              format="HH"
              id="time-picker"
              class="time-picker"
            ></vue-timepicker>
            hr
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="newtask.duration.mm"
              format="mm"
              class="time-picker"
            ></vue-timepicker>
            min
          </div>
        </form>
      </template>

      <template v-slot:footer>
        <button type="submit" @click.prevent="sendTask">Submit</button>
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
      },

      user: fb.auth().currentUser.uid,
      categoryList: [],
      //toggle showing add new category
      addNewCat: false,
    };
  },
  methods: {
    fetchCategoryList: function () {
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
    handler() {
      event.preventDefault();
      console.log("rightclick");
    },
    sendTask() {
      this.$v.$touch();
      console.log(this.$v.$invalid);
      console.log(this.$v.newtask.category.doesNotExist);
      console.log(this.addNewCat == true);

      if (!this.$v.$invalid) {
        //managing newcategories
        if (this.addNewCat) {
          // if (!this.categoryList.includes(this.newcategory)) {
          this.categoryList.push(this.newtask.category);
          console.log(this.categoryList);

          fb.firestore().collection("users").doc(this.user).update({
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
    addNewCategory: function (value) {
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
* {
  font-family: Roboto;
  font-size: 10px;
}
img {
  width: 38px;
  height: 38px;
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
