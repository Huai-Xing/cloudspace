<template>
<div>

  <div class="row">

    <!-- Left Column -->
    <div class="column">
      <img id="leftphoto" src="../assets/background5_signin.png">
    </div>

    <!-- Middle Column -->    
    <div class="column">
      <div id="chunk">
        <p id="sign" v-show="newUser"> Sign Up </p>
        <p id="sign" v-show="!newUser"> Log In </p>
        <form>
          <label for="name" v-show="newUser">Name:</label><br>
          <input type="text" id="name" name="name" placeholder="E.g. John Doe" v-show="newUser" required><br>

          <label for="email">Email:</label><br>
          <input type="text" id="email" name="email" placeholder="user@domain.com" required><br>

          <label for="password">Password:</label><br>
          <input type="text" id="password" name="password" placeholder="Enter your password" required><br>

          <input type="checkbox" id="checkbox">
          <label for="checkbox" id="cblabel">Keep me logged in</label><br>

          <button type="submit" value="Submit" id="submit"> Let's go! </button>
    
        </form>
      </div>
    </div>

    <!-- Right Column -->
    <div class="column">
      <img id="rightphoto" src="../assets/background4_signin.png">
    </div>

  </div>
  <!-- SignUpPage Content -->

  <pgFooter></pgFooter>
</div>
</template>


<script>
export default {
  data() {
    return {
      newUser: this.$route.params.newUser
    }
  },
  // mtds
  methods: {
    newUsery: function() {
      console.log(this.$route.params.newUser);
      return this.$route.params.newUser;
    }
  },
  //Register Locally
  components: {
  },
  created() {
    this.newUsery();
  }
}
</script>


<style scoped>
* {
  font-family: Roboto;
  font-weight: lighter;
  font-size: 13px
}

.column {
  float:left;
  width: 33.33%;
  height: 100%;
}

.row {
  content: "";
  display: table;
  clear: both;
  width: 100%;
  height: 100%;
}

#leftphoto {
  position: relative;
  top: 90%;
  left:10%;
  width: 340px;
}

#rightphoto {
  position: relative;
  top: 30%;
  width: 360px;
}

#chunk {
  position: relative;
  top: 70%;
  left: 60%;
  transform: translate(-40%, -30%);
}

#sign {
  font-family: Lora;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

input {
  font-family: Roboto;
  width: 250px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 3px;
  margin-bottom: 15px;
  border-radius: 3px;
  border-width: thin;
  border-color: #cccccc;
  border-style: solid;
}

::placeholder {
  color: #cccccc;
  opacity: 1;
  font-family: Roboto;
  font-style: italic;
}

#checkbox {
  vertical-align: middle;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 20px;
  border-color: #cccccc;
}

#cblabel {
  font-style: italic;
  font-size: 10px;
  vertical-align: middle;
  color: #cccccc;
}

#submit {
  width: 270px;
  padding: 6px;
  margin-top: 12px;
  font-family: Lora;
  border: none;
  background-color: #BEDAAE;
}

</style>
