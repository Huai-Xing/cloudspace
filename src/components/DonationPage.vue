<template>
  <div>
    <main-navigation v-bind:imageIdx="imageIdx"></main-navigation>

    <div class="donation-container">
      <div class="donation-inner">
        <h3>Giving back to nature</h3>
        <p class="donation-text">
          At Cloudspace, we believe in giving what we can back to Mother Nature.
          Your donations help to support NParks' OneMillionTrees movement.
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
          <button>Donate any other amount via PayNow</button>
        </div>
      </div>
    </div>

    <credit-card-form
      class="credit-card-form"
      v-bind:amount="amount"
    ></credit-card-form>
  </div>
</template>

<script>
  import CreditCardForm from "./Donation/CreditCardForm.vue";
  import MainNavigation from "./MainNavigation.vue";
  export default {
    components: { MainNavigation, CreditCardForm },
    data() {
      return {
        imageIdx: this.$route.params.image || 0,
        amount: "--",
      };
    },
    methods: {
      setDonationAmount: function(val) {
        this.amount = val;
        console.log(this.amount);
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
    width: 40%;
    height: 430px;
    margin: auto;
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
  }
  button {
    height: auto;
    width: auto;
    padding: 5px;
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
  }
</style>
