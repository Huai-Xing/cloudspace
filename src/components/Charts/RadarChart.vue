<template>
  <div class="chart">
    <radar id="radar" :chart-data="datacollection" :options="options"></radar>
  </div>
</template>


<script>
import Radar from "./RadarChart.js";

export default {
  components: {
    Radar,
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
        legend: {
          position: "top",
          display: false,
        },
        layout: {
          padding: {
            left: -50,
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 900,
            fontSize: 10,
            callback: function (value) {
              return (value / 900) * 15 + " min";
            },
          },

          pointLabels: {
            fontSize: 15,
          },
        },

        tooltips: {
          // When hovering over the points, show the tooltip label
          callbacks: {
            title: (tooltipItem, dataPt) => dataPt.labels[tooltipItem[0].index],
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
#radar {
  position: relative;
  height: 40vh;
  width: 35vw;
}
</style>
