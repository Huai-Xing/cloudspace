/* jshint esversion: 6 */

// Import the components to define routes for.
import MainPage from './components/MainPage.vue';
import SignInPage from './components/SignInPage.vue';

import UserProfilePage from './components/UserProfilePage.vue';
import HomePage from './components/HomePage.vue';
import CalendarPage from './components/CalendarPage.vue';
import ProductivityPage from './components/ProductivityPage.vue';
import TasksPage from './components/TasksPage.vue';
import TaskTimer from './components/TaskTimer.vue';
import PlantATreePage from './components/PlantATreePage.vue';

export default [
  // When at the main landing page
  { path: '/', name: 'Main', component: MainPage },
  { path: '/signin/:newUser', name: 'signin', component: SignInPage, props: true },

  // When the user log in
  { path: '/signin/home', name: 'Home', component: HomePage },
  { path: '/signin/profile', name: 'Profile', component: UserProfilePage, props: true },

  { path: '/signin/calendar', name: 'Calendar', component: CalendarPage, props: true },
  { path: '/signin/productivity', name: 'Productivity', component: ProductivityPage, props: true },
  { path: '/signin/tasks', name: 'Tasks', component: TasksPage, props: true },
  //{ path: '/signin/tasks/timer/:id', name: 'Timer', component: TaskTimer, props: true }, // uncomment this at the moment to test out timer first
  { path: '/signin/tasks/timer/', name: 'Timer', component: TaskTimer, props: true },
  { path: '/signin/plant-tree', name: 'PlantTree', component: PlantATreePage, props: true },

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
