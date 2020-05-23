import Vue from "vue";
import translatorService from "../../services/translatorService";

export default {
  namespaced: true,

  state: {
    language: "en-us",
    languageTexts: [],
  },

  mutations: {
    setLanguage(state, language) {
      Vue.set(state, "language", language);
    },
    setLanguageTexts(state, languageTexts) {
      Vue.set(state, "languageTexts", languageTexts);
    },
  },

  actions: {
    translate: async (context, payload) => {
      await translatorService.translate(payload.lang).then((response) => {
        // context.commit("setLanguage", payload.lang);
        // context.commit("setLanguageTexts", response.data);
        console.log(response);
      });
    },
  },
};
