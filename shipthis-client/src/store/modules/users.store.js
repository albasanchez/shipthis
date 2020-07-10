/* eslint-disable no-empty */
/* eslint-disable no-unused-labels */
import jwt from "../../common/jwt.service";
import Repository from "../../services/repositories/repositoryFactory";
const AuthorizeRepository = Repository.get("authorize");
const UserProfileRepository = Repository.get("userProfile");

// Initial State object
const initialState = () => {
  return {
    user: {},
    newUser: null,
    tracking_info: {},
    tracking_status: {},
    error: "",
  };
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
  getNewUser(state) {
    return state.newUser;
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
  set_new_user(state, data) {
    state.newUser = data;
  },
  set_error_message(state, error) {
    state.error = error;
  },
  set_language(state, language) {
    state.language = language;
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
      commit("set_error_message", e.response.data.shipthisMesagge);
    }
  },
  async authorizeGoogle({ commit }) {
    try {
      //recibiendo de firebase
      let response = await AuthorizeRepository.authorizeGoogle();
      //set user datos firebase
      commit("set_user", {
        email: response.additionalUserInfo.profile.email,
        person: {
          date_of_birth: null,
          def_language: response.additionalUserInfo.profile.locale,
          document: null,
          first_name: response.additionalUserInfo.profile.given_name,
          gender: null,
          last_name: response.additionalUserInfo.profile.family_name,
          middle_name: null,
          person_id: null,
          phone_number: null,
          picture_url: response.additionalUserInfo.profile.picture,
          receive_notifications: null,
          second_last_name: null,
        },
        registration_date: null,
        registration_type: null,
        rol: {
          name: null,
          rol_id: null,
        },
        status: null,
        user_id: null,
        username: null,
      });
      // extrayendo el lenguaje de lo que devuelve Google
      let userLang = response.additionalUserInfo.profile.locale.toUpperCase();
      if (userLang.search("ES") !== -1) {
        let extractedLang = userLang.search("ES");
        userLang = userLang.substr(extractedLang, 2);
      } else if (userLang.search("EN") !== -1) {
        let extractedLang = userLang.search("EN");
        userLang = userLang.substr(extractedLang, 2);
      } else userLang = "EN";
      //enviando al backend
      response = await AuthorizeRepository.authorizeGoogleBackend({
        useremail: response.user.email,
        first_name: response.additionalUserInfo.profile.given_name,
        last_name: response.additionalUserInfo.profile.family_name,
        def_language: userLang,
        picture_url: response.additionalUserInfo.profile.picture,
      });
      commit("set_user", response.userdata);
      commit("set_new_user", response.newUser);
      jwt.saveToken(response.token);
    } catch (e) {
      commit("set_error_message", e.response.data.shipthisMesagge);
    }
  },
  async authorizeFacebook({ commit }) {
    try {
      //recibiendo de firebase
      let response = await AuthorizeRepository.authorizeFacebook();
      //set user datos firebase
      commit("set_user", {
        email: response.additionalUserInfo.profile.email,
        person: {
          date_of_birth: null,
          def_language: null,
          document: null,
          first_name: response.additionalUserInfo.profile.first_name,
          gender: null,
          last_name: response.additionalUserInfo.profile.last_name,
          middle_name: null,
          person_id: null,
          phone_number: null,
          picture_url: response.additionalUserInfo.profile.picture.data.url,
          receive_notifications: null,
          second_last_name: null,
        },
        registration_date: null,
        registration_type: null, //PENDIENTE PREGUNTAR O BUSCAR EN BD
        rol: {
          name: null, //PENDIENTE PREGUNTAR
          rol_id: null, //PENDIENTE PREGUNTAR O BUSCAR EN BD
        },
        status: null, //PENDIENTE PREGUNTAR O BUSCAR EN BD
        user_id: null, //PENDIENTE PREGUNTAR O BUSCAR EN BD
        username: null, //PENDIENTE DI SE VA A HACER UN SPLITTEDEMAIL COMO EN DELIVRIER
      });
      //enviando al backend
      response = await AuthorizeRepository.authorizeFacebookBackend({
        useremail: response.user.email,
        first_name: response.additionalUserInfo.profile.first_name,
        last_name: response.additionalUserInfo.profile.last_name,
        def_language: "EN",
        picture_url: response.additionalUserInfo.profile.picture.data.url,
      });
      commit("set_user", response.userdata);
      commit("set_new_user", response.newUser);
      jwt.saveToken(response.token);
    } catch (e) {
      commit("set_error_message", e.response.data.shipthisMesagge);
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
  async updateProfile({ commit }, payload) {
    try {
      const response = await UserProfileRepository.updateProfile(payload);
      commit("set_user", response.user);
    } catch (e) {
      commit("set_error_message", e.response.data.shipthisMesagge);
    }
  },
  async updatePassword({ commit }, payload) {
    try {
      await UserProfileRepository.updatePassword(payload);
      commit("set_error_message", "");
    } catch (e) {
      commit("set_error_message", e.response.data.shipthisMesagge);
    }
  },
  async deleteAccount({ commit }, payload) {
    try {
      await UserProfileRepository.deleteAccount(payload);
      commit("set_error_message", "");
    } catch (e) {
      commit("set_error_message", e.response.data.shipthisMesagge);
    }
  },
  reset({ commit }) {
    commit("reset");
  },
  changeLanguage({ commit }, payload) {
    commit("set_language", payload);
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
