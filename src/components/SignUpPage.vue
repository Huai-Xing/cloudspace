<template>
  <div>
    <ul class="top-nav-list">
      <li>
        <router-link :to="{ path: '/signin' }"> Log In </router-link>
      </li>
      <li>|</li>
      <li>
        <router-link :to="{ path: '/signup' }"> Sign Up </router-link>
      </li>
    </ul>

    <img id="leftphoto" src="../assets/background5_signin.png" />

    <div id="chunk">
      <p id="sign">Sign Up</p>

      <form @submit.prevent="letsgo">
        <div>
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
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          v-model="user.password"
        /><br />

        <!-- <input type="checkbox" id="checkbox" /> -->
        <!-- <label for="checkbox" id="cblabel">Keep me logged in</label><br /> -->

        <button type="submit" value="Submit" id="submit">Let's go!</button>
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
        },
      };
    },
    // mtds
    methods: {
      letsgo: function() {
        var email = this.user.email;
        var password = this.user.password;
        //Signing up

        fb.auth()
          .createUserWithEmailAndPassword(email, password)
          .then((cred) => {
            alert("Successfully registered");

            fb.firestore()
              .collection("users")
              .doc(cred.user.uid)
              .set({
                user: {
                  name: this.user.name,
                  email: this.user.email,
                  DOB: "",
                  imageIdx: 0,
                  coins: 0,
                  trees: 0,
                },
                categoryList: [],
              });
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })

          .catch((error) => {
            alert(error.message);
          });

        event.target.reset();
      },

      // Fn to push the user to '/login/calendar' once the Let's go button is clicked
      // logIn: function() {
      //   // to push user to '/login/calendar'
      //   this.$router.push({ name: "Calendar" });

      //   // Other logic (retriving details from firebase for the specific user?) here
      // },
    },
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
    font-family: "Source Sans Pro";
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
    top: 14%;
    right: 7%;
    width: 21%;
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
    font-family: Source Sans Pro;
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
    font-family: Source Sans Pro;
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
    font-size: 11px;
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
    color: #fff;
  }

  #submit:hover {
    box-shadow: 0px 2px 15px #849c7651;
    transform: translateY(-1px);
  }

  #submit:active,
  #submit:focus {
    transform: translateY(2px);
    box-shadow: none;
    outline: none;
  }
</style>
