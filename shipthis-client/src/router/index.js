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

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      Navbar: Navbar,
      Footer: Footer
    }
  },
  {
    path: "/HomeUser",
    name: "HomeUser",
    components: {
      default: HomeUser
    }
  },
  {
    path: "/Registry",
    name: "Registry",
    components: {
      default: Registry
    }
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    components: {
      default: UserProfile
    }
  },
  {
    path: "/NewOrder",
    name: "NewOrder",
    components: {
      default: NewOrder
    }
  },
  {
    path: "/ShippingHistory",
    name: "History",
    components: {
      default: History
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
