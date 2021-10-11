import VueRouter from "vue-router";
import Register from "../pages/auth/Register";
import UsersView from "../pages/admin/users/UsersView";
import PresencesView from "../pages/admin/presences/PresencesView";
import Login from "../pages/auth/Login";
import { store } from "../vuex/index";
import UserPresenceView from "../pages/user/presence/UserPresenceView";

const routes = [
  {
    path: "/users",
    component: UsersView,
    name: "users-view",
    meta: { requireAdmin: true },
  },
  {
    path: "/presences",
    component: PresencesView,
    name: "presence-view",
    meta: { requireAdmin: true },
  },
  {
    path: "/presence",
    name: "user-presences",
    meta: { requireUserAuth: true },
    component: UserPresenceView,
  },

  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    path: "*",
    name: "404",
    redirect: "/login",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  const isUserAuth = store.state.Auth.isAuth;
  const isUserAdmin = store.getters.isAdmin;
  if (to.matched.some((record) => record.meta.requireUserAuth)) {
    if (!isUserAuth) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.requireAdmin)) {
    if (!isUserAdmin) {
      next({ name: "user-presences" });
    } else {
      next();
    }
  } else {
    next();
  }
}); // make sure to always call next()!

export default router;
