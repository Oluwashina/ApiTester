import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueIziToast from 'vue-izitoast'
import VJsoneditor from 'v-jsoneditor'

import 'izitoast/dist/css/iziToast.css'

Vue.config.productionTip = false
import Axios from 'axios'
import vuetify from './plugins/vuetify';
Axios.defaults.baseURL = "https://api-host-sample.herokuapp.com/"

Vue.use(VueIziToast);
Vue.use(VJsoneditor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
