/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';


// Register Header & Footer globally
import Header from './components/Header.vue';
Vue.component('pgHeader', Header);

import Footer from './components/Footer.vue';
Vue.component('pgFooter', Footer);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
