/* jshint esversion: 6 */

import { Bar } from 'vue-chartjs';
import database from '../../firebase.js'; //Import database

export default {
  extends: Bar,
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
