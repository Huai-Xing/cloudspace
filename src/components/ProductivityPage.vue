<template>
<div>
  <!-- Side MainNavigation after log in -->
  <appNav></appNav>

  <!-- ProductivityPage contents -->
  <div class="content-item">
    <div class="top-row" id="chart">
      <!-- uncomment below when the lineChart-component is done -->
      <!-- <lineChart-component></lineChart-component> -->
    </div>
  </div>

  <br>

  <div class="content-item">
    <div class="bottom-row" id="chart">
      <div class="column">
        <!-- uncomment below when the radarChart-component is done -->
        <radarChart-component></radarChart-component>
      </div>

      <div class="column">
        <!-- the tree summary component here -->
        <h3> Number of trees planted in total: </h3>
        <div class="tree-summary-circle">
          <!-- to replace this text to the bind data variable here -->
          <div class="summary-stat"> 3 </div>
        </div>

      </div>

    </div>
  </div>

</div>
</template>


<script>
import MainNavigation from "./MainNavigation.vue";

// Importing the Chart Components
//import LineChart from './Charts/LineChart.vue'
import RadarChart from "./Charts/RadarChart.vue";

export default {
  //Register Locally
  components: {
    appNav: MainNavigation,
    //'lineChart-component': LineChart,
    "radarChart-component": RadarChart,
  },

  methods: {
    // Fn to fetch/bind tree summary stat here?
    calcTotalTrees: function() {},
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  margin: 0 1.5%;

  width: 40%;
  padding: 10px;
  height: 400px;
  /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.bottom-row:after {
  content: "";
  display: table;
  clear: both;
}

/** Styling for the circle **/
.tree-summary-circle {
  /* (A) PERCENTAGE WIDTH & BORDER RADIUS */
  width: 30%;
  border-radius: 50%;

  /* (B) BACKGROUND COLOR */
  background: #bedaae;

  /* (C) NECESSARY TO POSITION TEXT BLOCK */
  line-height: 0;
  position: relative;

  /* I was trying to make the entire circle to be in the middle, but idk why the styling dont work */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* (D) MATCH HEIGHT */
.tree-summary-circle:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

/* (E) TEXT BLOCK */
.summary-stat {
  /* (E1) CENTER TEXT IN CIRCLE */
  position: absolute;
  bottom: 50%;
  width: 100%;
  text-align: center;

  /* (E2) THE FONT */
  /*font-weight: bold; */
  font-size: 100px;
  color: #fff;
}
</style>
