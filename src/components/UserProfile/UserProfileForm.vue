<template>
  <div>
    <form action="/action_page.php">
      <label for="Name">Name</label>
      <input type="text" id="Name" v-model.trim="Name" disabled="true" />
      <span id="NameChange" v-on:click="toggle(1)">Change</span>
      <br /><br />
      <label for="Password">Password</label>
      <input
        type="password"
        id="Pwd"
        v-model.trim="Password"
        disabled="PwdDisable"
      />
      <span id="PwdChange" v-on:click="toggle(2)">Change</span>
      <br /><br />
      <label for="Email">Email</label>
      <input type="text" id="Email" v-model.trim="Email" disabled="true" />
      <br /><br />
      <label for="DOB">Date Of Birth</label>
      <input type="date" id="DOB" v-model.trim="DOB" disabled="DOBDisable" />
      <span id="DOBChange" v-on:click="toggle(3)">Change</span>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      Name: "ASd",
      Password: "1234",
      Email: "A@A",
      DOB: "",
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
    /*
    fetchData: function () {
      database
        .collection("user")
        .doc("UID")
        .get()
        .then((doc) => {
          this.Name = doc.data().Name;
          this.Password = doc.data().Password;
          this.DOB = doc.data().DOB;
        });
    },
    updateData: function () {
      database.collection("user").doc("UID").update({
        Name: this.Name,
        Password: this.Password,
        DOB: this.DOB,
      }).then(() => {location.reload()});
    },
    */
  },
  created: function () {
    //this.fetchData();
  },
};
</script>


<style scoped>
div {
    align-items: center;
    display: flex;
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
}
span {
  text-decoration: underline;
  margin-left: 15px;
  cursor: pointer;
  margin-right: 50px;
}
</style>
