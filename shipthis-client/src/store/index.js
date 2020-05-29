import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    user: null,
  },
  mutations: {
    login(state, { token, user }) {
      console.log("token :>> ", token);
      state.idToken = token;
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
