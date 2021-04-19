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
          How Cloudspace Works
        </h2>
        <h3 class="content-subheader">
          Keep your life in check, in time, and in balance.
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
            <h2>Personalised productivity</h2>
            <p>Dashboards at your fingertips</p>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="background2_main"
              src="../assets/background3_trees.png"
            />
            <h2>Collect coins to plant a real tree!</h2>
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
          To help Kranji Woodlands site to recover its green lands!
        </h3>

        <div class="content-describe-row">
          <div class="column">
            <img
              class="column-image"
              alt="deforested"
              src="../assets/deforested.png"
            />
            <h2> Did you know? </h2>
            <p>
              About 4.5 hectare of land at Kranji Woodlands was cleared by
              mistake.
            </p>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="football_field"
              src="../assets/football-field.png"
            />
            <h2>How big is 4.5 hectare? </h2>
            <p>
              The ‘errorneously’ cleared forested area is about the size of 6
              football fields!
            </p>
          </div>

          <div class="column">
            <img
              class="column-image"
              alt="npark-logo"
              src="../assets/NParks_logo.jpg"
            />
            <h2>
              Cloudspace's environmental conservation efforts
            </h2>
            <p>
              Partnering with NParks, join Cloudspace to grow real trees to help
              Kranji Woodlands recover its greenery.
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
    font-size: 13px;
    box-sizing: border-box;
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
    font-size: 12px;
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
    width: 200px;
    height: 200px;
  }
  h2 {
    font-weight: bold;
  }
  h3 {
    font-size: 16px;
  }
</style>
