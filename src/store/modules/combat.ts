import { CombatState, State } from '@/utilities/interfaces';

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
    location: (state: { location: number }) => state.location,
    player: (state: { player: CombatState }) => state.player,
    enemy: (state: { enemy: CombatState }) => state.enemy,
  },
  mutations: {
    RESET_PLAYER_STATE: (state: State, payload: CombatState) => {
      state.player = payload;
    },
    RESET_ENEMY_STATE: (state: State, payload: CombatState) => {
      state.enemy = payload;
    },
    SET_LOCATION: (state: State, payload: number) => {
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
