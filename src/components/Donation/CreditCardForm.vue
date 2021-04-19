<template>
  <div class="card-form">
    <div class="card-form__inner">
      <div class="card-container"></div>
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">Card Number</label>
        <input
          v-imask="cardMasks"
          v-model="$v.cardNumber.$model"
          autofocus
          id="cardNumber"
          class="card-input__input"
          autocomplete="off"
          placeholder="#### #### #### ####"
        />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">Card Owner</label>
        <input
          id="cardName"
          class="card-input__input"
          v-model="$v.name.$model"
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label"
              >Expiration Date</label
            >
            <select
              class="card-input__input -select"
              id="cardMonth"
              v-model="$v.expireMonth.$model"
              required
            >
              <option value="" disabled selected>Month</option>
              <option v-for="n in 12" :key="n" :value="10 > n ? '0' + n : n">{{
                10 > n ? "0" + n : n
              }}</option>
            </select>
            <select
              class="card-input__input -select"
              id="cardYear"
              v-model="$v.expireYear.$model"
              required
            >
              <option value="" disabled selected>Year</option>
              <option
                v-for="(n, $index) in 12"
                :value="$index + currentYear"
                :key="n"
                >{{ $index + currentYear }}</option
              >
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
              type="text"
              class="card-input__input"
              id="cardCvv"
              v-model="$v.cvv.$model"
              autocomplete="off"
              v-imask="cvvMask"
            />
          </div>
        </div>
      </div>
      <div v-if="$v.$dirty" class="error">
        <div
          v-show="
            !$v.cardNumber.required ||
              !$v.name.required ||
              !$v.expireMonth.required ||
              !$v.expireYear.required ||
              !$v.cvv.required
          "
        >
          Please fill up all fields
        </div>
        <div v-if="$v.amount.invalidAmount">
          Please choose a donation amount
        </div>
      </div>

      <button class="donate-btn" @click.prevent="donate">
        Donate ${{ amount }}
      </button>
      <thank-you-modal v-bind:amount="amount"></thank-you-modal>
    </div>
  </div>
</template>

<script>
  import { IMaskDirective } from "vue-imask";
  import { cardMasks, cvvMask } from "./masks";
  import { required } from "vuelidate/lib/validators";
  import ThankYouModal from "./ThankYouModal.vue";

  function invalidAmount(val) {
    if (val == "--") {
      return true;
    } else {
      return false;
    }
  }

  export default {
    components: {
      ThankYouModal,
    },
    data() {
      return {
        cardMasks: cardMasks,
        cvvMask: cvvMask,
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        name: "",
        cvv: "",
        currentYear: new Date().getFullYear(),
        show: false,
      };
    },
    props: ["amount"],

    methods: {
      donate() {
        this.$v.$reset();
        this.$v.$touch();
        console.log(this.$v);
        console.log(this.$v.$invalid);
        console.log("cardnum" + this.$v.cardNumber.required);
        console.log("month" + this.$v.expireMonth.required);
        console.log("year" + this.$v.expireYear.required);
        console.log("name" + this.$v.name.required);
        console.log("cvv" + this.$v.cvv.required);
        console.log("amount" + this.$v.amount.invalidAmount);
        if (
          !this.$v.cardNumber.required ||
          !this.$v.name.required ||
          !this.$v.expireMonth.required ||
          !this.$v.expireYear.required ||
          !this.$v.cvv.required ||
          this.$v.amount.invalidAmount
        ) {
          event.preventDefault();
        } else {
          console.log("test");
          this.$root.$refs.ThankYouModal.showModal();
        }
      },
    },
    directives: {
      imask: IMaskDirective,
    },
    validations: {
      cardNumber: { required },
      expireMonth: { required },
      expireYear: { required },
      name: { required },
      cvv: { required },
      amount: { invalidAmount },
    },
  };
</script>

<style scoped>
  * {
    font-family: Lora;
  }
  .card-container {
    margin: 0px auto 50px auto;
  }
  .card-form {
    max-width: 430px;
    /* margin: auto 150px auto auto; */
    width: 100%;
    display: inline-flex;
  }
  .card-form__inner {
    background: #fff;
    box-shadow: -10px 0px 20px -10px rgba(90, 116, 148, 0.2);
    border-radius: 0px 20px 20px 0px;
    padding: 1% 10% 7% 3%;
  }
  .card-form__row {
    display: flex;
    align-items: flex-start;
  }
  .card-form__col {
    flex: auto;
    margin-right: 15px;
  }
  .card-form__col:last-child {
    margin-right: 0;
  }
  .card-form__col.-cvv {
    max-width: 150px;
  }
  .card-form__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .card-form__group .card-input__input {
    flex: 1;
    margin-right: 15px;
  }
  .card-form__group .card-input__input:last-child {
    margin-right: 0;
  }

  .card-input {
    margin-bottom: 20px;
  }
  .card-input__label {
    margin-bottom: 5px;
    color: #1a3b5d;
    width: 100%;
    display: block;
    text-align: left;
  }
  .card-input__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 3px 7px;
    background: none;
    color: #1a3b5d;
  }
  .card-input__input:hover,
  .card-input__input:focus {
    border-color: #38a294;
  }
  .card-input__input:focus {
    box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
  }
  .card-input__input.-select {
    -webkit-appearance: none;
    background-image: url("/img/select.png");
    background-size: 12px;
    background-position: 90% center;
    background-repeat: no-repeat;
    padding-right: 30px;
  }
  select:invalid {
    color: #999;
  }
  .error {
    color: red;
  }
  .error-space {
    height: 40px;
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
</style>
