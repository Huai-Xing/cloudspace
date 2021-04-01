<template>
<div>
  <ul class="top-nav-list">
    <li>
      <router-link :to="{ path: 'signin' }">
        Log In
      </router-link>
    </li>
    <li>|</li>
    <li>
      <router-link :to="{ path: 'signup' }">
        Sign Up
      </router-link>
    </li>
  </ul>

  <img id="leftphoto" src="../assets/background5_signin.png" />

  <div id="chunk">
    <p id="sign">Log In</p>
    <form @submit.prevent="letsgo">
      <label for="email">Email:</label><br />
      <input type="text" id="email" name="email" placeholder="user@domain.com" required v-model="user.email" /><br />

      <label for="password">Password:</label><br />
      <input type="text" id="password" name="password" placeholder="Enter your password" required v-model="user.password" /><br />

      <input type="checkbox" id="checkbox" />
      <label for="checkbox" id="cblabel">Keep me logged in</label><br />

      <button type="submit" value="Submit" id="submit">
        Let's go!
      </button>
    </form>
  </div>

  <img id="rightphoto" src="../assets/background4_signin.png" />

  <!-- SignUpPage Content -->

  <pgFooter></pgFooter>
</div>
</template>

<script>
  import fb from "../firebase";
  export default {
    data() {
      return {
        user: {
          name: "",
          email: "",
          password: "",
          DOB: "",
          imageIdx: 0,
          coins: 0,
          trees: 0,
        },
      };
    },
    // mtds
    methods: {
      letsgo: function() {
        var email = this.user.email;
        var password = this.user.password;
        // var user = this.user;
        //Signing up

        //Singing in
        fb.auth()
          .signInWithEmailAndPassword(email, password)
          .then((cred) => {
            alert("Successfully logged into " + cred.user.email);
            // console.log(cred.user.uid);
          })
          .then(() => {
            this.$router.push({
              name: "Home",
              params: { name: this.user.email },
            });
          })
          .catch((error) => {
            alert(error.message);
          });

        this.user.email = "";
        this.user.password = "";
        event.target.reset();
      },
    };
  },
  // mtds
  methods: {
    letsgo: function() {
      var email = this.user.email;
      var password = this.user.password;
      // var user = this.user;
      //Signing up

      //Singing in
      fb.auth()
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          alert("Successfully logged into " + cred.user.email);
          // console.log(cred.user.uid);
        })
        .then(() => {
          this.$router.push({
            name: "Home",
            params: {
              name: this.user.email
            },
          });
        })
        .catch((error) => {
          alert(error.message);
        });

      this.user.email = "";
      this.user.password = "";
      event.target.reset();
    },
  },

  // Fn to push the user to '/login/calendar' once the Let's go button is clicked
  // logIn: function() {
  //   // to push user to '/login/calendar'
  //   this.$router.push({ name: "Calendar" });

  //   // Other logic (retriving details from firebase for the specific user?) here
  // },

  // beforeRouteUpdate(to, from, next) {
  //   this.newUser = to.params.newUser;
  //   next();
  // },
  //Register Locally
  components: {},
};
</script>

<style scoped>
* {
  font-weight: lighter;
  font-size: 13px;
}

body {
  min-width: 100%;
  width: 100%;
}

img {
  width: 300px;
  height: 300px;
}

ul {
  position: absolute;
  right: 10%;
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

a {
  color: black;
}

#leftphoto {
  position: absolute;
  left: 3%;
  bottom: 5%;
  width: 22%;
  height: auto;
}

#rightphoto {
  position: absolute;
  top: 12%;
  right: 3%;
  width: 26%;
  height: auto;
}

#chunk {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  background-color: #bedaae;
}
</style>
