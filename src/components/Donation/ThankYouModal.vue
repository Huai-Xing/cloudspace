<template>
  <div>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <p>Thank you for your contribution!</p>
      </template>

      <template v-slot:body>
        <p class="treeModalText">
          You have donated ${{ amount }}
          <br />
          NParks will send a receipt to your email
        </p>
      </template>

      <template v-slot:footer>
        <button @click="closeModal" class="cfmBtn">
          Close
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "../Modal.vue";

  export default {
    props: ["amount"],
    components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
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
    created() {
      this.$root.$refs.ThankYouModal = this;
    },
  };
</script>

<style scoped>
  * {
    font-family: Lora;
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
  .donate-btn {
    width: 100%;
    height: 55px;
    background: #38a294;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;
  }
  .donate-btn:hover {
    background: #318f83;
  }
  .treeModalText {
    text-align: center;
  }
</style>
