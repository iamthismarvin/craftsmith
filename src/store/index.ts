import { createStore } from 'vuex';
import inventory from '@/store/modules/inventory';
import log from '@/store/modules/log';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    inventory,
    log,
  },
});
