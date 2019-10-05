import 'normalize.css'

import Vue from 'vue'
import App from './App'
import store from './store/index'

// @ts-ignore
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
Vue.component('v-date-picker', DatePicker)

Vue.config.productionTip = false


// console.log(store); console.log('^...store: in main.ts')
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
