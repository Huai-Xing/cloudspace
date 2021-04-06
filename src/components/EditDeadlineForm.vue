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
          <div class="row">
            <label for="title">Title</label>
            <input
              v-model="$v.updateddeadline.title.$model"
              type="text"
              id="title"
              v-bind:placeholder="currentDeadline.title"
            />
          </div>
          <div v-if="$v.updateddeadline.title.$dirty">
            <div v-if="!$v.updateddeadline.title.required" class="error">
              Title is required
            </div>
          </div>
          <div class="row">
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

            <div v-if="addNewCat">
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

          <div class="row">
            <label>Date Due</label>
            <input type="date" v-model.trim="updateddeadline.datedue" />
          </div>
          <br />

          <div class="row">
            <label> Date Due </label>
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
          </div>
          <br />

          <div class="row">
            <label>Show Deadline</label>
            <input v-model="updateddeadline.showInAdvance" />
            <p class="days">days in advance</p>
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
  fetchToBeEdited: function () {
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
      addNewCat: false,
      disabledselect: false,
      disabledinput: false,
      user: fb.auth().currentUser.uid,
      categoryList: [],
      currentDeadline: [],
    };
  },
  methods: {
    fetchCategoryList: function () {
      fb.firestore()
        .collection("users")
        .doc(this.user)
        .get()
        .then((doc) => {
          this.categoryList = doc.data().categoryList;
        });
    },
    fetchToBeEdited: function () {
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //managing newcategories
        if (this.addNewCat) {
          this.categoryList.push(this.updateddeadline.category);

          fb.firestore().collection("users").doc(this.user).update({
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
      } else {
        event.preventDefault();
      }
    },
    addNewCategory: function (value) {
      console.log(123);
      this.addNewCat = value;
    },
  },

  created() {
    this.fetchCategoryList();
    this.fetchToBeEdited();
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
    },
  },
};
</script>

<style scoped>
* {
  font-family: Roboto;
  font-size: 10px;
}
img {
  height: 28px;
  width: auto;
  margin: 2px;
  text-align: center;
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
