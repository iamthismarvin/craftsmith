import { LogState } from '@/utilities/interfaces';

export default {
  namespaced: true,
  state: { log: [] },
  getters: {
    log: (state: LogState) => state.log,
  },
  mutations: {
    ADD_LOG_ENTRY(state: LogState, payload: string) {
      state.log.push(payload);
    },
  },
  actions: {
    CREATE_LOG_ENTRY({ commit }: { commit: Function }, payload: string) {
      commit('ADD_LOG_ENTRY', payload);
    },
  },
};
