import Vue from "vue";
import VueRouter from "vue-router";
import jwt from "../common/jwt.service";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/HomeUser",
    name: "HomeUser",
    meta: { requiresAuth: true },
    component: () => import("../views/HomeUser.vue"),
  },
  {
    path: "/Registry",
    name: "Registry",
    component: () => import("../views/Registry.vue"),
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    meta: { requiresAuth: true },
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/NewOrder",
    name: "NewOrder",
    meta: { requiresAuth: true },
    component: () => import("../views/NewOrder.vue"),
  },
  {
    path: "/ShippingHistory",
    name: "History",
    meta: { requiresAuth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/tracking/:id",
    name: "Tracking",
    component: () => import("../views/Tracking.vue"),
  },
  {
    path: "/receivers/",
    name: "Receivers",
    meta: { requiresAuth: true },
    component: () => import("../views/Receivers.vue")
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (!jwt.isTokenValid()) {
      store.dispatch("logout");
      if (route.meta.requiresAuth) {
        jwt.destroyToken();
        next({ name: "Home" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
