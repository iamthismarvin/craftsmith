import { db } from '@/database';
import { CharacterState, Stats } from '@/utilities/interfaces';

export default {
  namespaced: true,
  state: {
    id: null,
    name: null,
    experience: null,
    stats: {
      dexterity: null,
      intelligence: null,
      stamina: null,
      strength: null,
    },
  },
  getters: {
    experience: (state: CharacterState) => state.experience,
    id: (state: CharacterState) => state.id,
    name: (state: CharacterState) => state.name,
    stats: (state: CharacterState) => state.stats,
  },
  mutations: {
    SET_EXPERIENCE_STATE(state: CharacterState, payload: number) {
      state.experience = payload;
    },
    SET_ID_STATE(state: CharacterState, payload: number) {
      state.id = payload;
    },
    SET_NAME_STATE(state: CharacterState, payload: string) {
      state.name = payload;
    },
    SET_STATS_STATE(state: CharacterState, payload: Stats) {
      state.stats = payload;
    },
  },
  actions: {
    async SET_CHARACTER_FROM_DB({ commit }: { commit: Function }) {
      const id: number = Number(localStorage.getItem('id'));
      const character = await db.character.get(id);
      if (character) {
        commit('SET_EXPERIENCE_STATE', character.experience);
        commit('SET_ID_STATE', character.id);
        commit('SET_NAME_STATE', character.name);
        commit('SET_STATS_STATE', character.stats);
      } else {
        console.log(`Character (id: ${id}) does not exists.`);
      }
    },
  },
};
