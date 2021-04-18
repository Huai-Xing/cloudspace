<template>
  <div class="chart">
    <line-chart
      id="line"
      :chart-data="datacollection"
      :options="options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart,
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
        hover: {
          onHover: function (e) {
            var point = this.getElementAtEvent(e);
            if (point.length) e.target.style.cursor = "pointer";
            else e.target.style.cursor = "default";
          },
        },
        onClick: (event, data) => {
          try {
            var a = data[0]._index; // index of data for time taken
            //console.log(a);
            //console.log(this.datacollection.labels[a]);
            var selected = this.datacollection.labels[a];
            var idx = selected.indexOf("/");
            var day = selected.substring(0, idx);
            selected = selected.substring(idx + 1, selected.length);
            idx = selected.indexOf("/");
            var month = selected.substring(0, idx);
            var year = selected.substring(idx + 1, selected.length);
            //console.log(day + " " + month + " " + year);
            var dateString = year + "-" + month + "-" + day;
            //console.log(new Date(dateString));
            this.callEmit(dateString, true);
          } catch (err) {
            //console.log(err);
            this.callEmit("", false);
          }
        },
        //console.log("CLICK: " + tooltipItem + " IT  " + Object.keys(array[0]) + "month " + array[0]._datasetIndex + "data " + array[0]._index );
        layout: {
          padding: 10,
        },
        legend: {
          position: "bottom",
          labels: {
            fontSize: 10,
            boxWidth: 20,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 3600,
                fontSize: 10,
                callback: function (value) {
                  return (value / 3600) * 1 + " hr";
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
              ticks: {
                fontSize: 10,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          // When hovering over the points, show the tooltip label
          callbacks: {
            title: function (tooltipItem, data) {
              return "Date: " + data.labels[tooltipItem[0].index];
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
  methods: {
    callEmit: function (x, bool) {
      this.$emit("drillDown", x, bool);
    },
  },
};
</script>

<style scoped>
#line {
  position: relative;
  height: 45vh;
}
</style>
