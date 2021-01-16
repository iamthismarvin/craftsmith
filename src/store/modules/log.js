export default {
  namespaced: true,
  state: { log: [] },
  getters: {
    log: state => {
      return state.log;
    },
  },
  mutations: {
    ADD_LOG_ENTRY(state, payload) {
      state.log.push(payload);
    },
  },
  actions: {
    CREATE_LOG_ENTRY({ commit }, payload) {
      commit('ADD_LOG_ENTRY', payload);
    },
  },
};
