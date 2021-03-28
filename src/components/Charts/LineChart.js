/* jshint esversion: 6 */

import { Line } from 'vue-chartjs';
import database from '../../firebase.js'; //Import database

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {},
        ],
      },

      options: {

      },
    };
  },

  methods: {
    fetchItems: function () {


        this.renderChart(this.datacollection, this.options); // render the chart
    },
  },

  created() {
    this.fetchItems();
  },
};
