<template>
  <div>
    <main-navigation v-bind:imageIdx="imageIdx"></main-navigation>
    <div class="wrapper">
      <div class="donation-container">
        <div class="donation-inner">
          <h3>Giving back to nature</h3>
          <p class="donation-text">
            At Cloudspace, we believe in giving what we can back to Mother
            Nature. Your donations help to support NParks' OneMillionTrees
            movement.
            <br />
            Join us in our mission to restore nature back into our city today!
          </p>
          <div class="bigger-grid">
            <div class="grid-container">
              <button v-on:click="setDonationAmount(10)">$10</button>
              <button v-on:click="setDonationAmount(50)">$50</button>
              <button v-on:click="setDonationAmount(100)">$100</button>
              <button v-on:click="setDonationAmount(200)">$200</button>
            </div>
            <qr-modal class="qr-btn"></qr-modal>
          </div>
        </div>
      </div>
      <credit-card-form
        class="credit-card-form"
        v-bind:amount="amount"
      ></credit-card-form>
    </div>
  </div>
</template>

<script>
  import CreditCardForm from "./Donation/CreditCardForm.vue";
  import MainNavigation from "./MainNavigation.vue";
  import QRModal from "./Donation/QRModal";
  import fb from "../firebase";
  export default {
    components: { MainNavigation, CreditCardForm, "qr-modal": QRModal },
    data() {
      return {
        imageIdx: this.$route.params.image,
        amount: "--",
        user: fb.auth().currentUser.uid,
      };
    },
    methods: {
      setDonationAmount: function(val) {
        this.amount = val;
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Lora;
  }

  .donation-container {
    background-color: #f3f3ed;
    height: 500px;
    /* margin: auto; */
    border-radius: 20px 0px 0px 20px;
    /* display: inline-flex; */
  }
  .donation-inner {
    padding: 10%;
  }
  .donation-text {
    line-height: 1.6;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    padding: 10px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-area: main;
  }
  button {
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
  button:focus {
    box-shadow: inset 0px 0px 4px #c1c1c1;
    transform: translateY(1px);
    outline: none;
  }
  h3 {
    color: #34b2c5;
  }
  .bigger-grid {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-areas: "main" "footer";
  }
  .qr-btn {
    margin: auto;
    grid-area: footer;
  }
  .wrapper {
    display: flex;
    margin-left: 25%;
    margin-right: 15%;
    padding: 0;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
  .credit-card-form {
    height: 500px;
  }
</style>
