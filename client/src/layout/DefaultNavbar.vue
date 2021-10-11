<template>
  <div>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isConnected"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Time Counter</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed left app>
      <v-list nav dense class="mt-16">
        <template v-if="isAdmin">
          <v-list-item-group>
            <v-list-item
              :key="route.name"
              v-for="route in admin.routes"
              :to="{ name: route.name }"
            >
                <v-icon class="mx-3">{{ route.icon }}</v-icon>
              <v-list-item-title class="mt-2">
                {{ route.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </template>
        <template v-if="!isAdmin">
          <v-list-item
            :key="route.name"
            v-for="route in user.routes"
            :to="{ name: route.name }"
          >
           <v-icon class="mx-3">{{ route.icon }}</v-icon>
            <v-list-item-title class="mt-2">{{ route.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item @click="logout">
          <v-icon class="mx-3">mdi-logout</v-icon>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { types } from "../vuex/modules/auth.module";
export default {
  name: "default-navbar",
  data: () => ({
    drawer: false,
    group: null,
    admin: {
      routes: [
        { title: "Users", name: "users-view", icon: "mdi-account-group" },
        {
          title: "Presences",
          name: "presence-view",
          icon: "mdi-account-clock",
        },
      ],
    },
    user: {
      routes: [
        {
          title: "My Presence",
          name: "user-presences",
          icon: "mdi-account-clock",
        },
      ],
    },
  }),
  computed: {
    isAdmin() {
      return this.$store.state.Auth.isAdmin;
    },
    isConnected() {
      return this.$store.state.Auth.user;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    async logout() {
      const res = await this.$store.dispatch(types.LOGOUT);
      if (res.success) {
        this.$router.push({ name: "login" });
        location.reload();
      }
    },
  }
};
</script>