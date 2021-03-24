/* jshint esversion: 6 */
import Vue from "vue";
import App from "./App.vue";
import Routes from "./routes.js"; // Register routes
import fb from "./firebase";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// Register Header & Footer globally
import Header from "./components/Header.vue";
Vue.component("pgHeader", Header);

import Footer from "./components/Footer.vue";
Vue.component("pgFooter", Footer);

Vue.config.productionTip = false;

// Step 3 - Register Routes
const myRouter = new VueRouter({
  routes: Routes,
  mode: "history",
});

var currentUser = fb.auth().currentUser;
// var email = currentUser.email;
// var password = currentUser.password;
// Router guards
myRouter.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (currentUser == null) {
      next({
        name: "Main",
      });
    } else {
      next();
    }
  }
  next();
});

fb.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Current user: " + user.uid);
  } else {
    console.log("Current user: " + null);
  }
});

new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
