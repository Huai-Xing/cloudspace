<template>
  <div class="chart">
    <line-chart></line-chart>
  </div>
</template>


<script>
import linechart from '../Charts/LineChart.js'

export default {
  components: {
    'line-chart': linechart,
  }
};
</script>


<style scoped>
</style>
