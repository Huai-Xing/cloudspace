
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = 'roboto';

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
};
