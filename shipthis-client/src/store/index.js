import Vue from "vue";
import Vuex from "vuex";
import jwt from "../common/jwt.service";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules, //all modules are automatically imported
  state: {
    idToken: null,
    user: null,
  },
  mutations: {
    login(state, { token, user }) {
      state.idToken = token;
      state.user = user;
      jwt.saveToken(token);
    },
    logout(state) {
      state.idToken = null;
      state.user = null;
      jwt.destroyToken();
    },
  },
  actions: {
    logout({ commit }) {
      commit("logout");
      //resets state of all the modules
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/reset`);
      });
    },
  },
  getters: {},
  plugins: [createPersistedState({ paths: ["users"] })],
});
