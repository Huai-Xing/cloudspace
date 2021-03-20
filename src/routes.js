/* jshint esversion: 6 */

// Import the components to define routes for.
import MainPage from './components/MainPage.vue';
import SignInPage from './components/SignInPage.vue';

import UserProfile from './components/UserProfile.vue';
import Calendar from './components/Calendar.vue';
import Productivity from './components/Productivity.vue';
import Tasks from './components/Tasks.vue';
import TaskTimer from './components/TaskTimer.vue';
import PlantATree from './components/PlantATree.vue';

export default [
  // When at the main/home landing page
  { path: '/', component: MainPage },
  { path: '/signin/:newUser', name: 'signin', component: SignInPage, props: true },

  // When the user log in
  { path: '/login/profile', component: UserProfile },
  { path: '/login/calendar', component: Calendar },
  { path: '/login/productivity', component: Productivity },
  { path: '/login/tasks', component: Tasks },
  { path: '/login/tasks/timer/:id', component: TaskTimer, props: true },
  { path: '/login/plant-tree', component: PlantATree },

];
