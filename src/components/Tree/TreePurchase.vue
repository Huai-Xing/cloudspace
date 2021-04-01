<template>
  <div id="app">
    <button type="button" class="buyBtn" @click="showModal">
      <img class="priceCoin" src="../../assets/coin.png" />
      <span class="priceText"> {{ treePrice }} </span>
    </button>

    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <div v-show="afford">
          <p v-show="!bought">Are you sure?</p>
          <p v-show="bought">You planted a tree!</p>
        </div>
        <div v-show="!afford">Sorry!</div>
      </template>

      <template v-slot:body>
        <div v-show="afford">
          <p class="treeModalText" v-show="!bought">
            {{ treeName }} costs {{ treePrice }} coins. <br />
            Proceed with purchase?
          </p>
          <p class="treeModalText" v-show="bought">
            Thank you! <br />
            A confirmation has been sent to your email.
          </p>
        </div>

        <div v-show="!afford">Come back when you have enough coins!</div>
      </template>

      <template v-slot:footer>
        <button v-show="!bought && afford" @click="purchase" class="cfmBtn">Buy</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "../Modal.vue";
import firebase from "../../firebase";

export default {
  name: "App",
  props: ["treeName", "treePrice", "afford"],
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      bought: false,
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
      this.bought = true;
      var newCoins = parseInt(this.coins) - parseInt(this.treePrice);
      var uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(uid).update({
        "user.coins": newCoins,
      }).then(() => location.reload());
    }
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
  letter-spacing: 1.5px;
}
.treeModalText {
  font-family: Roboto;
  padding: 3px 50px 3px 50px;
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
