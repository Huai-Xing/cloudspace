<template>
<div>
  <form action="/action_page.php">
    <label for="Name">Name</label>
    <input type="text" id="Name" v-model="user.name" disabled="true" />
    <span id="NameChange" v-on:click="toggle(1)">Change</span>
    <br />
    <label for="Password">Password</label>
    <input type="password" id="Pwd" v-model.trim="user.password" disabled="true" />
    <span id="PwdChange" v-on:click="toggle(2)">Change</span>
    <br />
    <label for="Email">Email</label>
    <input type="text" id="Email" v-model="user.email" disabled="true" />
    <br />
    <label for="DOB">Date Of Birth</label>
    <input type="date" id="DOB" v-model.trim="user.DOB" disabled="true" />
    <span id="DOBChange" v-on:click="toggle(3)">Change</span>
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
        password: "",
        DOB: "",
        imageIdx: 0,
        coins: 0,
      },
    };
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
        if (document.getElementById("Pwd").disabled) {
          document.getElementById("PwdChange").textContent = "Save";
          document.getElementById("Pwd").disabled = false;
        } else {
          document.getElementById("PwdChange").textContent = "Change";
          document.getElementById("Pwd").disabled = true;
          this.updateData();
          this.updatePwd();
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
          this.user.password = doc.data().user.password;
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
      var newPassword = this.user.password;

      user.updatePassword(newPassword).then(function() {
        alert("Password Changed");
      }).catch(function(error) {
        alert("Password reset fail, please try again with a stronger password");
        console.log(error);
      });
    },
  },
  created: async function() {
    await this.fetchData();
  },
};
</script>

<style scoped>
div {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
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
</style>
