import { db } from '@/database';

export default {
  namespaced: true,
  state: { inventory: [] },
  getters: {
    inventory: state => {
      return state.inventory;
    },
  },
  mutations: {
    UPDATE_INVENTORY_STATE(state, payload) {
      state.inventory = payload;
    },
  },
  actions: {
    async UPDATE_INVENTORY({ commit }) {
      commit('UPDATE_INVENTORY_STATE', await db.inventory.toArray());
    },
  },
};
