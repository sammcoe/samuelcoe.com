export const state = () => ({
  creations: []
});

export const mutations = {
  add(state, creation) {
    state.creations.push(creation);
  },
  updateCreations(state, creations) {
    state.creations = creations;
  }
};

export const actions = {
  loadCreations({ commit }, creations) {
    const sorted = creations.sort((a, b) => {
      if (a === b) {
        return 0;
      }
      return a.rank < b.rank ? 1 : -1;
    });
    commit('updateCreations', sorted);
  }
};
