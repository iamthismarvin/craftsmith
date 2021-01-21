import { CombatState, Combatant } from '@/utilities/interfaces';

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
    SET_ENEMY_STATE: (state: CombatState, payload: Combatant) => {
      state.enemy = payload;
    },
    SET_PLAYER_STATE: (state: CombatState, payload: Combatant) => {
      state.player = payload;
    },
    SET_LOCATION: (state: CombatState, payload: number) => {
      state.location = payload;
    },
  },
  actions: {
    SET_COMBAT_STATE({ commit }: { commit: Function }, payload: CombatState) {
      commit('SET_PLAYER_STATE', payload.player);
      commit('SET_ENEMY_STATE', payload.enemy);
      commit('SET_LOCATION', payload.location);
    },
    SET_ENEMY_STATE({ commit }: { commit: Function }, payload: Combatant) {
      commit('SET_ENEMY_STATE', payload);
    },
    SET_PLAYER_STATE({ commit }: { commit: Function }, payload: Combatant) {
      commit('SET_PLAYER_STATE', payload);
    },
    SET_LOCATION({ commit }: { commit: Function }, payload: number) {
      commit('SET_LOCATION', payload);
    },
  },
};
