import 'normalize.css'

import Vue from 'vue'
import App from './App'
import store from './store'

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
