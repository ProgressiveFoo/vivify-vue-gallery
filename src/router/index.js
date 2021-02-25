import Vue from "vue";
import Galleries from "../views/Galleries.vue";
import VueRouter from "vue-router";
import MyGalleries from "../views/MyGalleries.vue";
import CreateNewGallery from "../views/CreateNewGallery.vue";
import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";
import { globalAuthGuard } from "../guards/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/galleries",
    name: "Galleries",
    component: Galleries,
    meta: { authRequired: true },
  },
  {
    path: "/",
    redirect: "/galleries",
  },
  {
    path: "/my-galleries",
    name: "MyGalleries",
    component: MyGalleries,
    meta: { authRequired: true },
  },
  {
    path: "/create-new-gallery",
    name: "CreateNewGallery",
    component: CreateNewGallery,
    meta: { authRequired: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestRequired: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestRequired: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(globalAuthGuard);
export default router;
