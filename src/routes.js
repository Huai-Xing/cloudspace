/* jshint esversion: 6 */

// Import the components to define routes for.
import MainPage from './components/MainPage.vue';
import LogInPage from './components/LogInPage.vue';
import SignUpPage from './components/SignUpPage.vue';

import UserProfilePage from './components/UserProfilePage.vue';
import SignOut from './components/SignOut.vue';

import CalendarPage from './components/CalendarPage.vue';
import ProductivityPage from './components/ProductivityPage.vue';
import TasksPage from './components/TasksPage.vue';
import TaskTimer from './components/TaskTimer.vue';
import PlantATreePage from './components/PlantATreePage.vue';

export default [
  // When at the main/home landing page
  { path: '/', component: MainPage },
  { path: '/signup', component: SignUpPage },
  //{ path: '/login', component: LogInPage },

  // When the user log in
  /*
  { path: '/login/profile', component: UserProfilePage },
  { path: '/login/signout', component: SignOut },

  { path: '/login/calendar', component: CalendarPage },
  { path: '/login/productivity', component: ProductivityPage },
  { path: '/login/tasks', component: TasksPage },
  { path: '/login/tasks/timer/:id', component: TaskTimer, props: true },
  { path: '/login/plant-tree', component: PlantATreePage },
  */


  // When the user log in
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

];
