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
        <form>
          Category
          <select v-model="newtask.category" :disabled="disabled">
            <option disabled value="">Please select a catergory</option>
            <option
              v-for="option in options"
              v-bind:value="option.value"
              v-bind:key="option"
            >
              {{ option.name }}
            </option>
          </select>
          <br />
          Add a new category
          <input
            type="text"
            v-model="newcategory"
            placeholder="Enter a new category"
          />
          <br />
          Task title <input type="text" />
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
        <button>Submit</button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal";
  import VueTimepicker from "vue2-timepicker";
  import "vue2-timepicker/dist/VueTimepicker.css";

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
        disabled: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
    watch: {
      newcategory: function(val) {
        if (val == "") {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
    },
  };
</script>

<style scoped></style>
