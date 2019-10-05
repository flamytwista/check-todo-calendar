import Vue from 'vue';
import Vuex from 'vuex';

import { createVuexStore } from 'vuex-simple';

import { MyStore } from './store';
// console.log(MyStore); console.log('^...MyStore in store/index.ts:')


Vue.use(Vuex);

// create our module class instance
const instance = new MyStore();
// console.log(instance); console.log('^...instance:')

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});
