<template>
  <div class="chart">
    <bar-chart
      id="bar"
      :chart-data="datacollection"
      :options="options"
    ></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";

export default {
  components: {
    BarChart,
  },
  props: {
    datacollection: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1800,
                fontSize: 10,
                callback: function (value) {
                  return (value / 1800) * 30 + " min";
                },
              },
              display: true,
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                fontSize: 10,
              },
            },
          ],
        },
        layout: {
          padding: {
            left: 10,
          },
        },
        legend: {
          position: "bottom",
          labels: {
            fontSize: 10,
            boxWidth: 20,
          },
        },
        title: {
          display: true,
          text: "",
        },
        tooltips: {
          // When hovering over the points, show the tooltip label
          callbacks: {
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            },
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              var value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              var hours = Math.floor(value / 3600);
              var minutes = Math.floor((value % 3600) / 60);
              var seconds = Math.floor((value % 3600) % 60);
              var time = "";
              if (hours != 0) {
                time += String(hours) + " hr ";
              }
              if (minutes != 0) {
                time += String(minutes) + " min ";
              }
              if (seconds != 0) {
                time += String(seconds) + " sec";
              }
              if (time == "") {
                time = "-";
              }
              return label + ": " + time;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style scoped>
#bar {
  position: relative;
  height: 40vh;
  width: 35vw;
}
</style>