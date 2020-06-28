import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTheMask from 'vue-the-mask';
import i18n from "./plugins/i18n";

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.use(VueTheMask);
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
