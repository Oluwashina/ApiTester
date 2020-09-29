import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { project } from './project';
import {calls} from './calls'

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => state,
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    project:project,
    calls: calls
  }
})
