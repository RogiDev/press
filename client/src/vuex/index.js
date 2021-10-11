import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Auth from "./modules/auth.module";
import Users from "./modules/users.module";
import Presence from "./modules/presences.module";

Vue.use(Vuex);

// persist user state accross refreshes and what-not
const persist = new VuexPersistence();

export const store = new Vuex.Store({
  modules: {
    Auth,
    Users,
    Presence
  },
  plugins: [persist.plugin],
});
