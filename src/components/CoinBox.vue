<template>
  <div class="coinBox">
    <img src="../assets/coin.png" class="coinImg" />
    <span class="coinNo">{{ coins }}</span>
  </div>
</template>

<script>
export default {
  props: ["coins"],
};
</script>

<style scoped>
.coinBox {
  display: flex;
  font-family: Lora;
  font-size: 16px;
  margin-left: 83%;
  border: 2px solid black;
  border-radius: 14px;
  width: max-content;
  padding: 0px 2px 0px 2px;
  align-items: center;
  justify-content: center;
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
</style>
