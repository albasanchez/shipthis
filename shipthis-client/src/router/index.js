import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registry from "../views/Registry.vue";
import UserProfile from "../views/UserProfile.vue";
import Navbar from "../components/navbar/Navbar.vue";
import Footer from "../components/Footer.vue";
import HomeUser from "../views/HomeUser.vue";
import NewOrder from "../views/NewOrder.vue";
import History from "../views/History.vue";
import Tracking from "../views/Tracking.vue";

import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      Navbar: Navbar,
      Footer: Footer,
    },
  },
  {
    path: "/HomeUser",
    name: "HomeUser",
    components: {
      default: HomeUser,
    },
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/Registry",
    name: "Registry",
    components: {
      default: Registry,
    },
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    components: {
      default: UserProfile,
    },
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/NewOrder",
    name: "NewOrder",
    components: {
      default: NewOrder,
    },
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ShippingHistory",
    name: "History",
    components: {
      default: History
    },
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/tracking/:id",
    name: "Tracking",
    components: {
      default: Tracking
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
