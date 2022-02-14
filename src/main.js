// import 'expose-loader?$!jquery';
// import 'expose-loader?jQuery!jquery';
import './assets/js/bootstrap.min';
//import 'bootstrap';
import Vue from 'vue';
import App from '../src/App.vue';
import { store } from "./store/store.js";
import { router } from './router/';

import util from "./utilities/util.js";
import VueSweetalert2 from 'vue-sweetalert2';
import VueTypedJs from "vue-typed-js";

import './assets/js/button-wave.js'; // material efficet for buttons 
//import './assets/js/widget.js'; // fresh chat widget
//import './assets/js/fresh-chat.js'; // fresh chat widget
import './assets/js/intro.js'; // intro 
import './assets/css/global.css'; //contain all css in one file
const options = {
  confirmButtonColor: '#2cadca',
  cancelButtonColor: '#fa7b50'
};

Vue.use(util);// utilities have http helpers
Vue.use(VueSweetalert2, options);
Vue.use(VueTypedJs);
Vue.prototype.$util = util;


Vue.config.devtools = true;
new Vue({
  store: store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
});