import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import messages from "./plugins/i18n";
import VueI18n from "vue-i18n";
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(Vuelidate);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "EN",
  messages,
});

Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
