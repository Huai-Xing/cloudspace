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
        <h2 class="content-section-header">
          What Does Cloudspace Do?
        </h2>
        <h3 class="content-subheader">
          Making your life greener and cleaner!
        </h3>

        <div class="content-describe-row">
          <div class="column">
            <img
              class="column-image"
              alt="background1_main"
              src="../assets/background1_main.png"
            />
            <h2>Organise your workspace</h2>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="background2_main"
              src="../assets/background2_main.png"
            />
            <h2>Personalised productivity dashboard at your fingertips</h2>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="background2_main"
              src="../assets/background3_trees.png"
            />
            <h2>Collect coins to plant real trees</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Cloudspace -->
    <div class="content-item">
      <div id="why-cloudspace">
        <h2 class="content-section-header">
          Why Cloudspace?
        </h2>
        <h3 class="content-subheader">
          We care for you and the environment.
        </h3>

        <div class="content-describe-row">
          <div class="column">
            <img
              class="column-image"
              alt="deforested"
              src="../assets/cut-trees.png"
            />
            <h2>Did you know?</h2>
            <p>
              Almost 160,000 trees are being cut down daily just to produce
              paper and related products!
            </p>
          </div>

          <div class="column">
            <img class="column-image" alt="timer" src="../assets/timer.png" />
            <h2>Stay focused</h2>
            <p>
              Cloudspace's timer and coin allocation system will keep you
              focused throughout your task
            </p>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="npark-logo"
              src="../assets/NParks_logo.png"
            />
            <h2>
              Cloudspace's environmental conservation efforts
            </h2>
            <p>
              Join Cloudspace, in partnership with NParks, to plant more trees
              in Singapore!
            </p>
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
    font-size: 14px;
    box-sizing: border-box;
    font-family: "Source Sans Pro";
  }

  img {
    width: 350px;
    height: auto;
  }

  #img_top {
    grid-row: 1;
    grid-column: 1 / span 8;
    z-index: 1;
  }

  #img_bottom {
    grid-column: 2 / 4;
    grid-row: 2 / 3;
  }

  .img_stack {
    display: grid;
    grid-template-columns: 250px;
    grid-template-rows: 100px;
    position: relative;
    grid-auto-rows: 5;
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
    font-size: 26px;
    font-family: Lora;
  }

  .content-subheader {
    text-align: center;
    font-size: 16px;
  }

  /* Create three equal columns that floats next to each other */
  .column {
    float: left;
    width: 33.33%;
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
  }

  /* Clear floats after the columns */
  .content-describe-row:after {
    content: "";
    display: table;
    clear: both;
  }

  .column-image {
    width: auto;
    height: 200px;
  }
  h2 {
    font-weight: bold;
    font-size: 15px;
  }
  p {
    padding-left: 15%;
    padding-right: 15%;
  }
</style>
