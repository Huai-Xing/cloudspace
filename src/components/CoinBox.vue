<template>
  <div class="coins">
    <span class="coinBox" v-on:click="goToTreePage">
      <img src="../assets/coin.png" class="coinImg" />
      <span class="coinNo">{{ coins }}</span>
    </span>

    <span class="tooltiptext">Plant a Tree Now!</span>
  </div>
</template>

<script>
export default {
  props: ["coins"],
  methods: {
    goToTreePage: function() {
      this.$router.push({name: "PlantTree"})
    },
  }
};
</script>

<style scoped>
.coins {
  display: flex;
  align-items: center;
}
.coinBox {
  display: inline-flex;
  font-family: Lora;
  font-size: 16px;
  margin-left: 80%;
  border: 2px solid #555;
  border-radius: 14px;
  width: max-content;
  padding: 0px 2px 0px 2px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.coinImg {
  height: 24px;
  margin: 2px;
}
.coinNo {
  padding: 5px;
  margin: 0px;
  text-decoration: none;
}
.tooltiptext {
  visibility: hidden;
  font-family: roboto;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.5px;
  background-color: #fff;
  padding: 3px 7px;
  text-align: center;
  border-radius: 6px;
  border: solid 1px #e0e0d9;
  margin-left: 10px;
  opacity: 0;
  transition: opacity 0.5s;
}
.coinBox:hover + .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
