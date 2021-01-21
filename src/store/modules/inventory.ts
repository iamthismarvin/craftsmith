import { db } from '@/database';
import { InventoryState, ItemsState } from '@/utilities/interfaces';

export default {
  namespaced: true,
  state: { inventory: [] },
  getters: {
    inventory: (state: { inventory: ItemsState }) => state.inventory,
  },
  mutations: {
    UPDATE_INVENTORY_STATE(state: InventoryState, payload: ItemsState) {
      state.inventory = payload;
    },
  },
  actions: {
    async UPDATE_INVENTORY({ commit }: { commit: Function }) {
      commit('UPDATE_INVENTORY_STATE', await db.inventory.toArray());
    },
  },
};
