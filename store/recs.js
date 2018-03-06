export const state = () => ({
  recommendations: []
});

export const mutations = {
  add(state, rec) {
    state.recommendations.push(rec);
  },
  updateRecommendations(state, recommendations) {
    state.recommendations = recommendations;
  }
};

export const actions = {
  loadRecommendations({ commit }, recommendations) {
    const sorted = recommendations.sort((a, b) => {
      if (a === b) {
        return 0;
      }
      return a.rank < b.rank ? 1 : -1;
    });
    commit('updateRecommendations', sorted);
  }
};
