import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Shipments",
    name: "ShipmentsView",
    component: () => import ('../views/ShipmentsView.vue' ),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Configuration",
    name: "ConfigurationView",
    component: () => import ('../views/ConfigurationView.vue' ),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
  {
    path: "/Emails",
    name: "EmailsView",
    component: () => import ('../views/EmailsView.vue' ),
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
