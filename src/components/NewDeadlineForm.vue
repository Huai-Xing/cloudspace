<template>
  <div id="app">
    <img src="../assets/task/add_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header> Add a New Deadline </template>

      <template v-slot:body>
        <form id="new-deadline-form">
          <div class="row">
            <label for="deadlinetitle">Title</label>
            <input
              v-model="newdeadline.title"
              type="text"
              id="deadlinetitle"
              placeholder="Give your deadline a name"
            />
          </div>
          <br />

          <div class="row">
            <label for="new-deadline-category">Category</label>
            <select
              v-model="newdeadline.category"
              :disabled="disabledselect"
              id="new-deadline-category"
            >
              <option disabled value="">
                Please select a category for your deadline
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
            <label> Add a new category </label>
            <input
              id="ndl-newcategory"
              type="text"
              v-model="newcategory"
              placeholder="Enter a new category"
              :disabled="disabledinput"
            />
          </div>
          <br />

          <!-- <p v-show="errors.category.length">{{ errors.category }}</p> -->

          <div class="row">
            <label>Date Due</label>
            <input type="date" v-model.trim="newdeadline.datedue" />
          </div>
          <br />

          <div class="row">
            <label>Time Due</label>
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
          </div>
          <br />

          <div class="row">
            <label>Show Deadline</label>
            <input v-model="newdeadline.showInAdvance" />
            <p class="days">days in advance</p>
          </div>
        </form>
      </template>

      <template v-slot:footer>
        <button @click.prevent="sendDeadline">Submit</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import fb from "../firebase";

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
        (this.newcategory = "");
      document.getElementById("new-deadline-form").reset();
    },
    sendDeadline() {
      this.newdeadline.date = new Date(this.newdeadline.datedue);
      //managing newcategories
      if (this.newcategory != "") {
        if (!this.categoryList.includes(this.newcategory)) {
          this.categoryList.push(this.newcategory);
          console.log(this.categoryList);
          this.newdeadline.category = this.newcategory;

          fb.firestore().collection("users").doc(this.user).update({
            categoryList: this.categoryList,
          });
        } else {
          // this.errors.category = "Category already exists";
          alert("Error - this category already exists!");
          event.preventdefault();
        }
      } else;
      console.log(this.newdeadline);

      //adding task to tasksList
      fb.firestore()
        .collection("tasks")
        .doc(this.user)
        .collection("deadlinesList")
        .add(this.newdeadline)
        .then(() => location.reload());

      //reset values
      this.isModalVisible = false;
      document.getElementById("new-deadline-form").reset();
      this.resetForm();
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
    "newdeadline.category": function (val) {
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
/* .btn {
    padding: 2px 2px 2px 2px;
  }
  .btn > img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  } */
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
</style>
