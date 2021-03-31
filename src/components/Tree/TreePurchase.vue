<template>
  <div id="app">
    <button type="button" class="buyBtn" @click="showModal">
        <img class="priceCoin" src="../../assets/coin.png" />
        <span class="priceText"> {{ treePrice }} </span>
    </button>

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        Are you sure?
      </template>

      <template v-slot:body>
        {{ treeName }}  costs {{ treePrice }} coins. Proceed with purchase?
      </template>

      <template v-slot:footer>
        <button @click="purchase">
          Buy
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "../Modal.vue";

  export default {
    name: "App",
    props: [ "treeName", "treePrice" ],
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
      purchase() {
          console.log("bought");
      }
    }
  };
</script>

<style scoped>
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
  color: #fff;
  transform: translateY(-2px);
}
.buyBtn:active,
.buyBtn:focus {
  color: #fff;
  background-color: #bfdaaf;
  box-shadow: 0px 10px 15px #6da34e51;
  color: #fff;
  transform: translateY(2px);
}
.priceCoin {
  height: 20px;
  width: auto;
  padding: 6px;
}
.priceText {
  padding: 6px;
  font-family: Lora;
  letter-spacing: 1.5px;
}
</style>
