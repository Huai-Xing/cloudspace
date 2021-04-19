<template>
  <div id="main">
    <form action="/action_page.php">
      <div>
        <label for="Name">Name</label>
        <input type="text" id="Name" v-model="user.name" disabled="true" />
        <span id="NameChange" v-on:click="toggle(1)">Change</span>
      </div>
      <div>
        <label for="Email">Email</label>
        <input type="text" id="Email" v-model="user.email" disabled="true" />
      </div>
      <div>
        <label for="DOB">Date Of Birth</label>
        <input type="date" id="DOB" v-model.trim="user.DOB" disabled="true" />
        <span id="DOBChange" v-on:click="toggle(3)">Change</span>
      </div>
      <span id="showPwdChange" v-show="!changePwd" v-on:click="toggle(2)"
        >Change Password</span
      >
      <div>
        <label v-show="changePwd" for="Password">Password</label>
        <input
          type="password"
          id="Pwd"
          v-model.trim="password"
          v-show="changePwd"
        />
        <span id="PwdChange" v-show="changePwd" v-on:click="toggle(2)"
          >Cancel</span
        >
      </div>
    </form>
  </div>
</template>

<script>
  import fb from "../../firebase.js";

  export default {
    data() {
      return {
        user: {
          name: "",
          email: "",
          DOB: "",
          imageIdx: 0,
          coins: 0,
        },
        changePwd: false,
        password: "",
      };
    },
    watch: {
      password: function() {
        if (this.password != "") {
          document.getElementById("PwdChange").textContent = "Save";
        } else {
          document.getElementById("PwdChange").textContent = "Cancel";
        }
      },
    },
    methods: {
      toggle: function(x) {
        if (x == 1) {
          if (document.getElementById("Name").disabled) {
            document.getElementById("NameChange").textContent = "Save";
            document.getElementById("Name").disabled = false;
          } else {
            document.getElementById("NameChange").textContent = "Change";
            document.getElementById("Name").disabled = true;
            this.updateData();
          }
        } else if (x == 2) {
          if (this.changePwd) {
            this.changePwd = false;
            if (document.getElementById("PwdChange").textContent != "Cancel") {
              this.updatePwd();
            }
          } else {
            this.changePwd = true;
          }
        } else {
          if (document.getElementById("DOB").disabled) {
            document.getElementById("DOBChange").textContent = "Save";
            document.getElementById("DOB").disabled = false;
          } else {
            document.getElementById("DOBChange").textContent = "Change";
            document.getElementById("DOB").disabled = true;
            this.updateData();
          }
        }
      },
      fetchData: async function() {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        await fb
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.user.name = doc.data().user.name;
            //this.user.password = doc.data().user.password;
            this.user.DOB = doc.data().user.DOB;
            this.user.email = doc.data().user.email;
            this.user.coins = doc.data().user.coins;
            this.user.imageIdx = doc.data().user.imageIdx;
          });
      },
      updateData: function() {
        var currentUser = fb.auth().currentUser;
        var uid = currentUser.uid;
        fb.firestore()
          .collection("users")
          .doc(uid)
          .update({
            user: this.user,
          });
      },
      updatePwd: function() {
        var user = fb.auth().currentUser;
        var newPassword = this.password;
        this.password = "";
        user
          .updatePassword(newPassword)
          .then(function() {
            alert("Password Changed");
          })
          .catch(function(error) {
            alert(error.message);
          });
      },
    },
    created: async function() {
      await this.fetchData();
    },
  };
</script>

<style scoped>
  #main {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  label {
    text-align: right;
    font-weight: 700;
    display: inline-block;
    width: 100px;
    margin-right: 20px;
  }
  input {
    width: 250px;
    height: 30px;
    background-color: #ddecd5;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  span {
    text-decoration: underline;
    margin-left: 15px;
    cursor: pointer;
    margin-right: 50px;
  }
  #showPwdChange {
    margin-left: 38%;
  }
  label {
    font-family: Lora;
  }
</style>
