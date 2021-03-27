<template>
  <div class="chart">
    <bar-chart></bar-chart>
  </div>
</template>


<script>
import barchart from '../Charts/BarChart.js'

export default {
  components: {
    'bar-chart': barchart,
  }
};
</script>


<style scoped>
</style>
