<template>
<div class="chart">
  <radar-chart id="radar"></radar-chart>
</div>
</template>


<script>
import radar from '../Charts/RadarChart.js'

export default {
  components: {
    'radar-chart': radar,
  }
};
</script>


<style scoped>
#radar {
  position: relative;
  height: 40vh;
  width: 35vw;
}
</style>
