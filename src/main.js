import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIziToast from 'vue-izitoast'
import VJsoneditor from 'v-jsoneditor'

import 'izitoast/dist/css/iziToast.css'

Vue.config.productionTip = false
import Axios from 'axios'
import vuetify from './plugins/vuetify';
Axios.defaults.baseURL = "https://api-host-sample.herokuapp.com/"
// Axios.defaults.baseURL = "http://192.168.43.70:8085/"

Vue.use(VueIziToast);
Vue.use(VJsoneditor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
