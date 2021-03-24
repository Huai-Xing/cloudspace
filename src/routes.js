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

export default [
  // When at the main landing page
  { path: "/", name: "Main", component: MainPage },

  // When the user log in
  {
    path: "/signin/home",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin/profile",
    name: "Profile",
    component: UserProfilePage,
    props: true,
    meta: { requiresAuth: true },
  },

  {
    path: "/signin/calendar",
    name: "Calendar",
    component: CalendarPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin/productivity",
    name: "Productivity",
    component: ProductivityPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin/tasks",
    name: "Tasks",
    component: TasksPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin/tasks/timer/:id",
    name: "Timer",
    component: TaskTimer,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signin/plant-tree",
    name: "PlantTree",
    component: PlantATreePage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
    props: true,
  },
  {
    path: "/signin",
    name: "signin",
    component: LogInPage,
    props: true,
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
