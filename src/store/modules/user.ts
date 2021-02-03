import { db } from '@/database';
import { UserState, Stats } from '@/utilities/interfaces';

export default {
  namespaced: true,
  state: {
    id: null,
    experience: null,
    stats: {
      dexterity: null,
      intelligence: null,
      stamina: null,
      strength: null,
    },
  },
  getters: {
    experience: (state: UserState) => state.experience,
    id: (state: UserState) => state.id,
    stats: (state: UserState) => state.stats,
  },
  mutations: {
    SET_EXPERIENCE_STATE(state: UserState, payload: number) {
      state.experience = payload;
    },
    SET_ID_STATE(state: UserState, payload: number) {
      state.id = payload;
    },
    SET_STATS_STATE(state: UserState, payload: Stats) {
      state.stats = payload;
    },
  },
  actions: {
    async UPDATE_USER({ commit }: { commit: Function }) {
      const id = 1;
      const user = await db.user.get(id);
      if (user) {
        commit('SET_EXPERIENCE_STATE', user.experience);
        commit('SET_ID_STATE', user.id);
        commit('SET_STATS_STATE', user.stats);
      } else {
        console.log(`User (id: ${id}) does not exists.`);
      }
    },
  },
};
