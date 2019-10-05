import 'normalize.css'

import Vue from 'vue'
import App from './App'
import store from './store'

// import VCalendar from 'v-calendar';
// Vue.use(VCalendar);
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

// Register components in your 'main.js'
// Vue.component('calendar', Calendar)
Vue.component('v-date-picker', DatePicker)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
