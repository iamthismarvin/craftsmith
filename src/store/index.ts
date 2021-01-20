import { createStore } from 'vuex';
import combat from '@/store/modules/combat';
import inventory from '@/store/modules/inventory';
import log from '@/store/modules/log';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    combat,
    inventory,
    log,
  },
});
