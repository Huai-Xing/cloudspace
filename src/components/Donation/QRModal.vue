<template>
  <div>
    <button class="paynow-btn" @click="showModal">
      Donate any other amount via PayNow
    </button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <p>Scan to donate via PayNow</p>
      </template>

      <template v-slot:body>
        <img src="../../assets/donation/qr.jpg" />
      </template>

      <template v-slot:footer>
        <button @click="closeModal" class="cfmBtn">
          Done
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
  };
</script>

<style scoped>
  * {
    font-family: Lora;
  }

  .paynow-btn {
    height: auto;
    width: auto;
    padding: 10px;
    vertical-align: middle;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
  }
  .paynow-btn:focus {
    box-shadow: inset 0px 0px 4px #c1c1c1;
    transform: translateY(1px);
    outline: none;
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
</style>
