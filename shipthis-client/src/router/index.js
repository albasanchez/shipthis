import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registry from "../views/Registry.vue";
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      "Navbar": Navbar,
      "Footer": Footer,
    }
  },
  {
    path: "/Registry",
      name: "Registry",
      components: {
        default: Registry,
        "Navbar": Navbar,
        "Footer": Footer,
      }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
