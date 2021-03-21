<template>
  <div>
    <ul class="top-nav-list">
      <li>
        <router-link :to="{ name: 'signin', params: { newUser: false } }">
          Log In
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'signin', params: { newUser: true } }">
          Sign Up
        </router-link>
      </li>
    </ul>

    <div class="row">
      <!-- Left Column -->
      <div class="column">
        <img id="leftphoto" src="../assets/background5_signin.png" />
      </div>

      <!-- Middle Column -->
      <div class="column">
        <div id="chunk">
          <p id="sign" v-show="newUser">Sign Up</p>
          <p id="sign" v-show="!newUser">Log In</p>
          <form @submit.prevent="letsgo">
            <div v-if="newUser">
              <label for="name">Name:</label><br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="E.g. John Doe"
                required
                v-model="user.name"
              /><br />
            </div>
            <label for="email">Email:</label><br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="user@domain.com"
              required
              v-model="user.email"
            /><br />

            <label for="password">Password:</label><br />
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              v-model="user.password"
            /><br />

            <input type="checkbox" id="checkbox" />
            <label for="checkbox" id="cblabel">Keep me logged in</label><br />

            <button type="submit" value="Submit" id="submit">
              Let's go!
            </button>
          </form>
        </div>
      </div>

      <!-- Right Column -->
      <div class="column">
        <img id="rightphoto" src="../assets/background4_signin.png" />
      </div>
    </div>
    <!-- SignUpPage Content -->

    <pgFooter></pgFooter>
  </div>
</template>

<script>
  import fb from "../firebase";
  export default {
    data() {
      return {
        newUser: this.$route.params.newUser,
        user: {
          name: "",
          email: "",
          password: "",
          DOB: "",
          imageIdx: 0,
          coins: 0,
        },
      };
    },
    // mtds
    methods: {
      letsgo: function() {
        var email = this.user.email;
        var password = this.user.password;
        var user = this.user;
        //Signing up
        if (this.newUser) {
          fb.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => {
              alert("Successfully registered");

              console.log("Registered user: " + cred.user.uid);
              fb.firestore()
                .collection("users")
                .doc(cred.user.uid)
                .set({
                  user,
                });
            })

            .catch((error) => {
              alert(error.message);
            })
            .then(() => {
              this.$router.push({ name: "Calendar" });
            });
          event.target.reset();
        } else {
          fb.auth()
            .signInWithEmailAndPassword(email, password)
            .then((cred) => {
              alert("Successfully logged into " + cred.user.email);
              // console.log(cred.user.uid);
            })
            .catch((error) => {
              alert(error.message);
            })
            .then(() => {
              this.$router.push({ name: "Calendar" });
            });
          this.user.email = "";
          this.user.password = "";
          event.target.reset();
        }
      },

      // Fn to push the user to '/login/calendar' once the Let's go button is clicked
      // logIn: function() {
      //   // to push user to '/login/calendar'
      //   this.$router.push({ name: "Calendar" });

      //   // Other logic (retriving details from firebase for the specific user?) here
      // },
    },
    //Register Locally
    components: {},
  };
</script>

<style scoped>
  * {
    font-family: Roboto;
    font-weight: lighter;
    font-size: 13px;
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
    display: inline;
    font-size: 14px;
    margin-left: 10px;
    margin-right: 10px;
    float: right;
  }

  .column {
    float: left;
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
    left: 10%;
    width: 340px;
  }

  #rightphoto {
    position: relative;
    top: 30%;
    width: 360px;
  }

  #chunk {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -40%);
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
