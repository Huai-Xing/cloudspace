<template>
  <div>
    <UserAvatar v-bind:ImageIdx="Data.ImageIdx"></UserAvatar>
    <br /><br />
    <UserForm v-bind:Data="Data"></UserForm>
  </div>
</template>


<script>
import UserForm from "./UserProfile/UserProfileForm.vue";
import UserAvatar from "./UserProfile/UserAvatar.vue";

export default {
  data() {
    return {
      Data: {
        Name: "",
        Password: "",
        DOB: "",
        Email: "",
        ImageIdx: 0,
      },
    };
  },
  components: {
    UserForm: UserForm,
    UserAvatar: UserAvatar,
  },
  methods: {
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
          this.Email = doc.data().Email;
          this.ImageIdx = doc.data().ImageIdx;
        });
    },
    */
  },
  created: function () {
    //this.fetchData();
  },
};
</script>


<style scoped>
/* 
<div class="content">
  <!-- Side MainNavigation after log in -->
  <div class="column left">
    <app-nav></app-nav>
  </div>

  <!-- UserProfilePage Content -->
  <div class="column right">

  </div>

</div>
</template>

<script>
import MainNavigation from './MainNavigation.vue';

export default {
  //Register Locally
  components: {
    'app-nav': MainNavigation,

  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
  height: 1220px; /* for demostration the division works */
}

.left {
  width: 15%;
  background-color: #e6ffff; /* for demostration the division works */
}

.right {
  width: 85%;
  background-color: #ccffff; /* for demostration the division works */
}

/* Clear floats after the columns */
.content:after {
  content: "";
  display: table;
  clear: both;
}
</style> */

