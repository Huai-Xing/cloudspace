<template>
  <div id="app">
    <button type="button" class="btn" @click="showModal">
      <img src="../assets/task/add1.png" />
    </button>

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Add a New Deadline
      </template>

      <template v-slot:body>
        <form id="myform">
          <label for="title">Title</label>
          <input
            v-model="newdeadline.title"
            type="text"
            id="title"
            placeholder="Give your deadline a name"
          />
          <br />
          <label for="category">Category</label>
          <select
            v-model="newdeadline.category"
            :disabled="disabledselect"
            id="category"
          >
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
          <br />
          Add a new category
          <input
            id="newcategory"
            type="text"
            v-model="newcategory"
            placeholder="Enter a new category"
            :disabled="disabledinput"
          />
          <!-- <p v-show="errors.category.length">{{ errors.category }}</p> -->
          <br />
          Date Due <input type="date" v-model.trim="newdeadline.duedate" />
          <br />
          Time Due
          <vue-timepicker
            close-on-complete
            v-model="newdeadline.timedue.hh"
            format="HH"
          ></vue-timepicker>
          hr
          <vue-timepicker
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

  export default {
    name: "App",
    components: {
      Modal,
      VueTimepicker,
    },
    props: {
      taskDate: Date,
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
          breakTime: 0,
          actualTime: 0,
          coinsEarned: 0,
          date: this.taskDate.toDate(),
        }),
          (this.newcategory = "");
        document.getElementById("myform").reset();
      },
      sendDeadline() {
        //managing newcategories
        if (this.newcategory != "") {
          if (!this.categoryList.includes(this.newcategory)) {
            this.categoryList.push(this.newcategory);
            console.log(this.categoryList);
            this.newdeadline.category = this.newcategory;

            fb.firestore()
              .collection("users")
              .doc(this.user)
              .update({
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
        document.getElementById("myform").reset();
        this.resetForm();
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
      "newdeadline.category": function(val) {
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
  .btn {
    padding: 2px 2px 2px 2px;
  }
  .btn > img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }
</style>
