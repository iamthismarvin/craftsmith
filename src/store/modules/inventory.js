export default {
  namespaced: true,
  state: { inventory: [] },
  getters: {
    inventory: state => {
      return state.inventory;
    },
  },
  mutations: {},
};
