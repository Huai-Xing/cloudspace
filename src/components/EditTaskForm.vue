<template>
  <div id="app">
    <img src="../assets/task/edit_btn.png" @click="showModal" />

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
              v-model="updatedtask.title"
              type="text"
              id="title"
              v-bind:placeholder="currentTask.title"
            />
          </div>
          <br />

          <div class="row">
            <label for="edit-task-category">Category</label>
            <select
              v-model="updatedtask.category"
              :disabled="disabledselect"
              id="edit-task-category"
            >
              <option disabled value="">
                Please select a new catergory for your task
              </option>
              <option
                v-for="option in categoryList"
                v-bind:value="option"
                v-bind:key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
          <br />

          <div class="row">
            <label>Add a new category</label>
            <input
              id="et-newcategory"
              type="text"
              v-model="newcategory"
              placeholder="Enter a new category"
              :disabled="disabledinput"
            />
          </div>
          <br />

          <div class="row">
            <label>Duration</label>
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="updatedtask.duration.hh"
              format="HH"
            ></vue-timepicker>
            hr
            <vue-timepicker
              manual-input
              close-on-complete
              v-model="updatedtask.duration.mm"
              format="mm"
            ></vue-timepicker>
            min
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

export default {
  name: "App",
  components: {
    Modal,
    VueTimepicker,
  },
  props: {
    idname: String,
  },
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
        .collection("tasksList")
        .doc(this.idname)
        .get()
        .then((doc) => {
          this.currentTask = doc.data();
          this.updatedtask = doc.data();
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateTask() {
      //managing newcategories
      if (this.newcategory != "") {
        this.categoryList.push(this.newcategory);

        this.updatedtask.category = this.newcategory;

        fb.firestore().collection("users").doc(this.user).update({
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
          this.isModalVisible = false;
          location.reload();
        });

      //reset values
      (this.updatedtask = {
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
      }),
        (this.newcategory = "");
      // this.isModalVisible = false;
      document.getElementById("edit-task-form").reset();
      console.log("this method works");
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
    "updatedtask.category": function (val) {
      if (val == "") {
        this.disabledinput = false;
      } else {
        this.disabledinput = true;
      }
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
