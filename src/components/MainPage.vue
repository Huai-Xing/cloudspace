<template>
<div>
  <ul class="top-nav-list">
    <li>
      <router-link :to="{ name: 'signin' }"> Log In </router-link>
    </li>
    <li>|</li>
    <li>
      <router-link :to="{ name: 'signup' }"> Sign Up </router-link>
    </li>
  </ul>

  <!-- How It Works section -->
  <div class="content-item">
    <div id="how-cloudspace-works">
      <h2 class="content-section-header"><strong> How Cloudspace Works </strong></h2>
      <h3 class="content-subheader"> Keep your life in check, in time, and in balance. </h3>

      <div class="content-describe-row">
        <div class="column">
          <img class="column-image" alt="background1_main" src="../assets/background1_main.png" />
          <h2><strong> Organise your workspace </strong></h2>
        </div>

        <div class="column">
          <img class="column-image" alt="background2_main" src="../assets/background2_main.png" />
          <h2><strong> Personalised productivity </strong></h2>
          <p> Dashboards at your fingertips </p>
        </div>

        <div class="column">
          <img class="column-image" alt="background2_main" src="../assets/background3_trees.png" />
          <h2><strong> Collect coins to plant a real tree! </strong></h2>
        </div>

      </div>
    </div>
  </div>

  <!-- Why Cloudspace -->
  <div class="content-item">
    <div id="why-cloudspace">
      <h2 class="content-section-header"><strong> Why Cloudspace? </strong></h2>
      <h3 class="content-subheader"> To help Kranji Woodlands site to recover its green lands!</h3>

      <div class="content-describe-row">
        <div class="column">
          <img class="column-image" alt="deforested" src="../assets/deforested.png" />
          <h2><strong> Did you know? </strong></h2>
          <p> About 4.5 hectare of land at Kranji Woodlands was cleared by mistake. </p>
        </div>

        <div class="column">
          <img class="column-image" alt="football_field" src="../assets/football-field.png" />
          <h2><strong> How big is 4.5 hectare? </strong></h2>
          <p> The ‘errorneously’ cleared forested area is about the size of 6 football fields! </p>
        </div>

        <div class="column">
          <img class="column-image" alt="npark-logo" src="../assets/NParks_logo.jpg" />
          <h2><strong> Cloudspace's environmental conservation efforts </strong></h2>
          <p> Partnering with NParks, join Cloudspace to grow real trees to help Kranji Woodlands recover its greenery. </p>
        </div>

      </div>
    </div>
  </div>

</div>
</template>


<script>
export default {};
</script>


<style scoped>
* {
  font-weight: lighter;
  font-size: 13px;
  box-sizing: border-box;
}

img {
  width: 300px;
  height: 300px;
}

a {
  color: black;
}

ul {
  position: absolute;
  right: 1%;
  top: 2%;
  list-style-type: None;
  margin: 0;
  padding: 0;
}

li {
  font-family: "Lora";
  display: inline;
  font-size: 14px;
  margin-left: 5px;
  margin-right: 5px;
  float: right;
}

/* Styling for the contents begins here */
.content-section-header {
  text-align: center;
  font-size: 15px;
}

.content-subheader {
  text-align: center;
}


/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  height: 400px; /* Should be removed. Only for demonstration */ 

  text-align: center;
}

/* Clear floats after the columns */
.content-describe-row:after {
  content: "";
  display: table;
  clear: both;
}

.column-image {
  width: 200px;
  height: 200px;
}
</style>
