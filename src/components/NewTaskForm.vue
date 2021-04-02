<template>
  <div id="app">
    <img src="../assets/task/add_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> Add a New Task </template>

      <template v-slot:body>
        <form id="new-task-form">
          <div class="row">
            <label for="task-title">Title</label>
            <input
              v-model.trim="newtask.title"
              type="text"
              id="task-title"
              placeholder="Give your task a name"
              required
            />
            <span class="required" v-if="!$v.newtask.title.required">
              Field is required
            </span>
          </div>
          <br />

          <div class="row">
            <label for="new-task-category">Category</label>
            <select
              v-model="newtask.category"
              :disabled="disabledselect"
              id="new-task-category"
            >
              <option disabled value="">
                Please select a category for your task
              </option>
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
          <br />

          <div class="row">
            <label for="nt-newcategory">Add a new category</label>
            <input
              id="nt-newcategory"
              type="text"
              v-model="newcategory"
              placeholder="Enter a new category"
              :disabled="disabledinput"
            />
          </div>
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

export default {
  name: "App",
  components: {
    Modal,
    VueTimepicker,
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
    fetchCategoryList: function () {
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

          fb.firestore().collection("users").doc(this.user).update({
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
    newcategory: function (val) {
      if (val == "") {
        this.disabledselect = false;
      } else {
        this.disabledselect = true;
      }
    },
    "newtask.category": function (val) {
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
::placeholder {
  color: rgb(110, 110, 110);
}
.time-picker {
  margin: 5px;
}
</style>
