import { db } from '@/database';
import { InventoryState, Inventory } from '@/utilities/interfaces';

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
    equipment: (state: InventoryState) => state.equipment,
    inventory: (state: InventoryState) => state.inventory,
  },
  mutations: {
    UPDATE_INVENTORY_STATE(state: InventoryState, payload: Inventory) {
      state.inventory = payload;
    },
  },
  actions: {
    async UPDATE_INVENTORY({ commit, rootState }: { commit: Function; rootState: any }) {
      const { character } = rootState;
      commit(
        'UPDATE_INVENTORY_STATE',
        await db.inventory
          .where('character')
          .equals(character.id)
          .toArray(),
      );
    },
  },
};
