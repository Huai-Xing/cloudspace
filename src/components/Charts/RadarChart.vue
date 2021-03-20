<template>
  <div class="chart">
    <radar-chart></radar-chart>
  </div>
</template>


<script>
import radar from '../charts/RadarChart.js'

export default {
  components: {
    'radar-chart': radar,
  }
};
</script>


<style scoped>
</style>
