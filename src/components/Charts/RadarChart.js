/* jshint esversion: 6 */

import { Radar } from 'vue-chartjs';
import database from '../../firebase.js'; //Import database

export default {
  extends: Radar,
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
