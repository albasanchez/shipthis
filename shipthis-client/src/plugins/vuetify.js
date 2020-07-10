import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa" || "md",
  },
  theme: {
    themes: {
      light: {
        primary: "#4d80e4",
        secondary: "#1c1954",
        accent: "#1c1954",
        error: "#FF5252",
        info: "#2196F3",
        success: "#07fcbf",
        warning: "#FFC107",
        Bronce: "#e5bf99",
        Silver: "#e3e4e5",
        Gold: "#efb810",
        Premium: "#7f7679",
      },
    },
  },
});
