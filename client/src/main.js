import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./routes";
import globalComponentInstaller from "@/plugins/globalComponentInstaller";
import DefaultLayout from "@/layout/DefaultLayout";
import {store} from "@/vuex";
import vuetify from "./plugins/vuetify";
import "./assets/reset.css";

Vue.use(VueRouter);
// globally register layout components
Vue.use(globalComponentInstaller, {
  components: [["default-layout", DefaultLayout]]
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount("#app");
