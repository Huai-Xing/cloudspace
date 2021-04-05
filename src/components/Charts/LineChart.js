/* jshint esversion: 6 */

import { Line, mixins } from "vue-chartjs";
//import fb from "../../firebase.js";
const { reactiveProp } = mixins;

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
