/* eslint-disable no-empty */
/* eslint-disable no-unused-labels */

// Initial State object
const initialState = () => {
  return { commercialAlly:null};
};

// State object
const state = initialState();

// Getter functions
const getters = {
  getCommercialAlly(state) {
    return state.commercialAlly;
  },
};

// Mutations
const mutations = {
  set_commercial_ally(state, data) {
    state.commercialAlly = data;
  },
  reset(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

// Actions
const actions = {
  async setCommercialAlly({ commit }, payload) {
      commit("set_commercial_ally", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
