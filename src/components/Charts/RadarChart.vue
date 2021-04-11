<template>
  <div class="chart">
    <h3 class="header">Average of Actual Time Spent on Each Task Category:</h3>
    <radar-chart></radar-chart>
  </div>
</template>

<script>
  import radar from "../Charts/RadarChart.js";

  export default {
    components: {
      "radar-chart": radar,
    },
  };
</script>

<style scoped>
  .header {
    font-family: Lora;
  }
</style>
