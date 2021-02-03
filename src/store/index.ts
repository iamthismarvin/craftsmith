import { createStore } from 'vuex';
import combat from '@/store/modules/combat';
import inventory from '@/store/modules/inventory';
import log from '@/store/modules/log';
import user from '@/store/modules/user';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    combat,
    inventory,
    log,
    user,
  },
});
