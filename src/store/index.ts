import { createStore } from 'vuex';
import combat from '@/store/modules/combat';
import inventory from '@/store/modules/inventory';
import log from '@/store/modules/log';
import character from '@/store/modules/character';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    combat,
    inventory,
    log,
    character,
  },
});
