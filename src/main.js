/* jshint esversion: 6 */
import Vue from "vue";
import App from "./App.vue";
import Routes from "./routes.js"; // Register routes
//Form validation
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

//Tooltip
import VTooltip from "v-tooltip";
Vue.use(VTooltip);

//Router
import VueRouter from "vue-router";
Vue.use(VueRouter);

import draggable from 'vuedraggable'
Vue.component('draggable', draggable)

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

// Router guards
// myRouter.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     fb.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         next();
//       } else {
//         next("/signin");
//       }
//     });
//   } else {
//     next();
//   }
// });

// fb.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log("Current user: " + user.uid);
//   } else {
//     console.log("Current user: " + null);
//   }
// });

new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
