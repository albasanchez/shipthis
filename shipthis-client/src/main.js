import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import messages from "./plugins/i18n";
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(Vuelidate);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'EN',
  messages
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
