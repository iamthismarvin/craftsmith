import db from '@/database';

export default {
  namespaced: true,
  state: { inventory: [] },
  getters: {
    inventory: state => {
      return state.inventory;
    },
  },
  mutations: {
    async UPDATE_INVENTORY(state) {
      state.inventory = await db.inventory.toArray();
    },
  },
};
