import Vue from "vue";
import Vuex from "vuex";
import jwt from "../common/jwt.service";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";
import LogRocket from "logrocket";
LogRocket.init(process.env.VUE_APP_LOGROCKET);


import createPlugin from "logrocket-vuex";
const logrocketPlugin = createPlugin(LogRocket);
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
      LogRocket.identify("123456", {
        name: "John Smith",
        email: "johnsmith@gmail.com",
      });
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
  plugins: [createPersistedState({ paths: ["users"] }),logrocketPlugin],
});
