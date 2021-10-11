<template>
  <v-app app>
      <default-layout  />
  </v-app>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout.vue"
export default {
  name: "App",
  components: {
    DefaultLayout
  },
  data: () => ({
    //
  }),
  created () {
    console.log(this);
  }
};
</script>
