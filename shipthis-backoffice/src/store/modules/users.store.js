/* eslint-disable no-empty */
/* eslint-disable no-unused-labels */
import jwt from "../../common/jwt.service";
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");

// Initial State object
const initialState = () => {
  return { user: {}, tracking_info: {}, tracking_status: {}, error: "" };
};

// State object
const state = initialState();

// Getter functions
const getters = {
  getError(state) {
    return state;
  },
  getUser(state) {
    return state.user;
  },
  getUserId(state) {
    return state.user.id;
  },
};

// Mutations
const mutations = {
  set_user(state, data) {
    state.user = data;
  },
  set_error_message(state, error) {
    state.error = error;
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
  async authorize({ commit }, payload) {
    try {
      const response = await AuthorizeRepository.authorize(payload);
      jwt.saveToken(response.token);
      commit("set_user", response.userdata);
    } catch (e) {
      commit("set_error_message", e);
    }
  },
  async admin_authorize({ commit }, payload) {
    try {
      const response = await AuthorizeRepository.admin_authorize(payload);
      jwt.saveToken(response.token);
      commit("set_user", response.userdata);
    } catch (e) {
      commit("set_error_message", e);
    }
  },
  async signup({ commit }, payload) {
    try {
      const response = await AuthorizeRepository.registration(payload);
      jwt.saveToken(response.token);
      commit("set_user", response.userdata);
    } catch (e) {
      commit("set_error_message", e);
    }
  },
  async adminSignup({ commit }, payload) {
    try {
      const response = await AuthorizeRepository.admin_registration(payload);
      jwt.saveToken(response.token);
    } catch (e) {
      commit("set_error_message", e);
    }
  },
  resetError({ commit }) {
    commit("set_error_message", "");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
