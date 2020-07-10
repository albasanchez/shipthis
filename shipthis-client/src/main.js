import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import { firebaseConfig } from "../firebase/fireBaseConfig";
import VueTheMask from "vue-the-mask";
import i18n from "./plugins/i18n";
import Vuesax from "vuesax"; //import dependency
import "vuesax/dist/vuesax.css"; // import css style

Vue.use(Vuesax); // implement Vuesax throughout the application

export const EventBus = new Vue();

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.use(VueTheMask);
new Vue({
  router,
  store,
  created() {
    firebase.initializeApp(firebaseConfig);
  },
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
