/* jshint esversion: 6 */

import { Radar } from 'vue-chartjs';

// Uncomment below when bind with database
//import database from '../../firebase.js'; //Import database

export default {
  extends: Radar,
  data: function () {
    return {
      chartdata: {
        labels: ['GEH1000', 'BT3102', 'BT3103', 'IS3103', 'CS2040'],
        datasets: [
          {
            label: 'January', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [23, 84, 59, 67, 93], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(64, 191, 128, 0.45)',

            radius: 4,
            pointRadius: 4, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: 'limegreen',
            pointBorderColor: 'rgba(64, 191, 128, 0.6)',
            pointHoverRadius: 7,
          },

          {
            label: 'February', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [62, 63, 14, 72, 53], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(200, 0, 0, 0.45)',

            radius: 4,
            pointRadius: 4, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: 'orange',
            pointBorderColor: 'rgba(200, 0, 0, 0.6)',
            pointHoverRadius: 7,
          },

          {
            label: 'March', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [15, 36, 77, 0, 28], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 200, 0.45)',

            radius: 4,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointBackgroundColor: 'cornflowerblue',
            pointBorderColor: 'rgba(0, 0, 200, 0.6)',
            pointHoverRadius: 7,
          },
        ],
      },

      options: {
        legend: {
          position: 'top',
        },

        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20,
          },

          pointLabels: {
            fontSize: 14,
          },
        },

        tooltips: { // When hovering over the points, show the tooltip label
          callbacks: {
            'title': (tooltipItem, dataPt) => dataPt.labels[tooltipItem[0].index],
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      },

    };
  },

  mounted() { // tentatively using this mounted() for the dummy data at the moment
    this.renderChart(this.chartdata, this.options);
  },

  methods: {
    // Uncomment this part when bind with database
    /*
    fetchItems: function () {


        this.renderChart(this.chartdata, this.options); // render the chart
    },
    */
  },

  created() {
    this.fetchItems();
  },
};
