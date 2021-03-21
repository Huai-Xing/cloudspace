<template>
  <div>
    <form action="/action_page.php">
      <label for="Name">Name</label>
      <input type="text" id="Name" v-model="Name" disabled=true/>
      <span id="NameChange" v-on:click="toggle(1)">Change</span>
      <br />
      <label for="Password">Password</label>
      <input
        type="password"
        id="Pwd"
        v-model.trim="Password"
        disabled=true
      />
      <span id="PwdChange" v-on:click="toggle(2)">Change</span>
      <br />
      <label for="Email">Email</label>
      <input type="text" id="Email" v-model="Email" disabled=true />
      <br />
      <label for="DOB">Date Of Birth</label>
      <input
        type="date"
        id="DOB"
        v-model.trim="DOB"
        disabled=true
      />
      <span id="DOBChange" v-on:click="toggle(3)">Change</span>
    </form>
  </div>
</template>


<script>
import fb from "../../firebase.js";

export default {
  props: ['Data'],
  data() {
    return {
      Name: "",
      Password: "",
      Email: "",
      DOB: "",
      UID: "",
    };
  },
  methods: {
    toggle: function (x) {
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
      await fb.firestore()
        .collection("users")
        .doc("MXJkiPOhxkMRofWdFxIMJUcSCTb2")
        .get()
        .then((doc) => {
          this.Name = doc.data().name;
          this.Password = doc.data().password;
          this.DOB = doc.data().DOB;
          this.Email = doc.data().email;
        });
    },
    updateData: function () {
      fb.firestore().collection("users").doc("MXJkiPOhxkMRofWdFxIMJUcSCTb2").update({
        name: this.Name,
        password: this.Password,
        DOB: this.DOB,
      })
    },
  },
  created: async function() {
    await this.fetchData();
  },
  mounted() {
    if (this.Data) {
      this.Name = this.Data.Name;
      this.UID = this.Data.UID;
    }
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
