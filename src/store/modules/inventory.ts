import { db } from '@/database';
import { EquipmentState, InventoryState, ItemsState } from '@/utilities/interfaces';

export default {
  namespaced: true,
  state: {
    equipment: {
      weapon: null,
      head: null,
      chest: null,
      hands: null,
      legs: null,
      feet: null,
    },
    inventory: [],
  },
  getters: {
    equipment: (state: { equipment: EquipmentState }) => state.equipment,
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
