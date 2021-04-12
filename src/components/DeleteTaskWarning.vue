<template>
  <div>
    <img src="../assets/task/trash_btn.png" @click="showModal" />

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <p>Are you sure?</p>
      </template>

      <template v-slot:body>
        <div>
          <p class="treeModalText">
            Deleting a task cannot be undone.
          </p>
        </div>
      </template>

      <template v-slot:footer>
        <button @click="closeModal" class="cfmBtn">
          No
        </button>
        <button @click="deleteTask" class="cfmBtn">
          Yes
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal.vue";
  import fb from "../firebase";

  export default {
    props: ["idname"],
    components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
        user: fb.auth().currentUser.uid,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      deleteTask() {
        let doc_id = this.idname;
        fb.firestore()
          .collection("tasks")
          .doc(this.user)
          .collection("tasksList")
          .doc(doc_id)
          .delete()
          .then(() => {
            location.reload();
          });
        this.closeModal();
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Lora;
  }
  .buyBtn {
    display: flex;
    height: 35px;
    width: auto;
    align-items: center;
    margin: 0 auto;
    border-radius: 20px;
    border: none;
    letter-spacing: 0.8px;
    color: #000;
    background-color: #fff;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }
  .buyBtn:hover {
    color: #fff;
    background-color: #bfdaaf;
    box-shadow: 0px 10px 15px #6da34e51;
    transform: translateY(-2px);
  }
  .buyBtn:active,
  .buyBtn:focus {
    color: #fff;
    background-color: #bfdaaf;
    box-shadow: 0px 10px 15px #6da34e51;
    transform: translateY(2px);
  }
  .priceCoin {
    height: 20px;
    width: auto;
    padding: 6px;
  }
  .priceText {
    padding: 6px;
    letter-spacing: 1.5px;
  }

  .cfmBtn {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    width: 100px;
    padding: 5px 12px 5px 12px;
  }
  img {
    width: 28px;
    height: 28px;
    margin: 2px;
  }
</style>
