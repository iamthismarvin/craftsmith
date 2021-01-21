import { CombatState, CombatantState } from '@/utilities/interfaces';

const resetStateValues = {
  health: 100,
  ready: true,
  weapon: 0,
};

export default {
  namespaced: true,
  state: {
    location: null,
    player: {
      health: null,
      ready: null,
      weapon: null,
    },
    enemy: {
      health: null,
      ready: null,
      weapon: null,
    },
  },
  getters: {
    location: (state: CombatState) => state.location,
    player: (state: CombatState) => state.player,
    enemy: (state: CombatState) => state.enemy,
  },
  mutations: {
    RESET_PLAYER_STATE: (state: CombatState, payload: CombatantState) => {
      state.player = payload;
    },
    RESET_ENEMY_STATE: (state: CombatState, payload: CombatantState) => {
      state.enemy = payload;
    },
    SET_LOCATION: (state: CombatState, payload: number) => {
      state.location = payload;
    },
  },
  actions: {
    RESET_PLAYER_STATE({ commit }: { commit: Function }) {
      commit('RESET_PLAYER_STATE', resetStateValues);
    },
    RESET_ENEMY_STATE({ commit }: { commit: Function }) {
      commit('RESET_ENEMY_STATE', resetStateValues);
    },
    SET_LOCATION({ commit }: { commit: Function }, payload: number) {
      commit('SET_LOCATION', payload);
    },
  },
};
