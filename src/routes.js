/* jshint esversion: 6 */

// Import the components to define routes for.
import MainPage from "./components/MainPage.vue";
import SignUpPage from "./components/SignUpPage.vue";
import LogInPage from "./components/LogInPage.vue";

import UserProfilePage from "./components/UserProfilePage.vue";
import HomePage from "./components/HomePage.vue";
import CalendarPage from "./components/CalendarPage.vue";
import ProductivityPage from "./components/ProductivityPage.vue";
import TasksPage from "./components/TasksPage.vue";
import TaskTimer from "./components/TaskTimer.vue";
import PlantATreePage from "./components/PlantATreePage.vue";

//firebase
import fb from "./firebase";

export default [
  // When at the main landing page
  {
    path: "/",
    name: "Main",
    component: MainPage,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next("/signin/home");
        } else {
          next();
        }
      });
    },
  },

  // When the user log in
  {
    path: "/signin/home",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    path: "/signin/profile",
    name: "Profile",
    component: UserProfilePage,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },

  {
    path: "/signin/calendar",
    name: "Calendar",
    component: CalendarPage,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    path: "/signin/productivity",
    name: "Productivity",
    component: ProductivityPage,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    path: "/signin/tasks",
    name: "Tasks",
    component: TasksPage,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    // path: "/signin/tasks/timer/:id",
    path: "/signin/tasks/timer",
    name: "Timer",
    component: TaskTimer,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    path: "/signin/plant-tree",
    name: "PlantTree",
    component: PlantATreePage,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next();
        } else {
          next("/signin");
        }
      });
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
    props: true,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next("/signin/home");
        } else {
          next();
        }
      });
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: LogInPage,
    props: true,
    beforeEnter: (to, from, next) => {
      fb.auth().onAuthStateChanged(function(user) {
        if (user) {
          next("/signin/home");
        } else {
          next();
        }
      });
    },
  },

  // When the user log in
  /*
  {
    path: '/login',
    component: LogInPage,

    children: [
      { path: '/login/profile', component: UserProfilePage },
      { path: '/login/signout', component: SignOut },

      { path: '/login/calendar', component: CalendarPage, },
      { path: '/login/productivity', component: ProductivityPage, },
      { path: '/login/tasks', component: TasksPage, },
      { path: '/login/tasks/timer/:id', component: TaskTimer, props: true, },
      { path: '/login/plant-tree', component: PlantATreePage },
    ],
  },
  */
];
