<template>
  <div id="app">
    <button type="button" class="btn" @click="showModal">
      <img src="..\assets\task\add1.png" />
    </button>

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Task
      </template>

      <template v-slot:body>
        <form id="myform">
          <label for="title">Title</label>
          <input
            v-model="newtask.title"
            type="text"
            id="title"
            placeholder="Give your task a name"
          />
          <br />
          <label for="category">Category</label>
          <select
            v-model="newtask.category"
            :disabled="disabledselect"
            id="category"
          >
            <option disabled value=""
              >Please select a catergory for your task</option
            >
            <option
              v-for="option in categoryList"
              v-bind:value="option"
              v-bind:key="option"
            >
              {{ option }}
            </option>
          </select>
          <br />
          Add a new category
          <input
            id="newcategory"
            type="text"
            v-model="newcategory"
            placeholder="Enter a new category"
            :disabled="disabledinput"
          />
          <br />
          Duration
          <vue-timepicker
            close-on-complete
            v-model="newtask.duration.hh"
            format="hh"
          ></vue-timepicker>
          hr
          <vue-timepicker
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

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
    },
    data() {
      return {
        isModalVisible: false,
        newtask: {
          category: "",
          title: "",
          status: "incomplete",
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
            console.log(this.categoryList);
          });
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      sendTask() {
        console.log(this.categoryList);

        //managing newcategories
        if (this.newcategory != "") {
          this.categoryList.push(this.newcategory);
          console.log(this.categoryList);
          this.newtask.category = this.newcategory;

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
          .add(this.newtask);

        //reset values
        (this.newtask = {
          category: "",
          title: "",
          status: "incomplete",
          duration: {
            hh: "",
            mm: "",
          },
          breakTime: 0,
          actualTime: 0,
          coinsEarned: 0,
        }),
          (this.newcategory = "");
        this.isModalVisible = false;
        document.getElementById("myform").reset();
        console.log("this method works");
      },
    },
    watch: {
      newcategory: function(val) {
        if (val == "") {
          this.disabledselect = false;
        } else {
          this.disabledselect = true;
        }
      },
      "newtask.category": function(val) {
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

<style scoped></style>
