import Vue from 'vue';
import Vuex from 'vuex';

import { createVuexStore } from 'vuex-simple';

import { MyStore } from '@/store/store';

Vue.use(Vuex);

const instance = new MyStore();

export default createVuexStore(instance);
