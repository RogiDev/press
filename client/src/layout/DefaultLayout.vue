<template>
<v-app> 
   <default-navbar />
 <v-main >
      <v-container>
        <v-row justify="center" align="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      
      </v-container>
 </v-main>
   <v-footer color="primary white--text">
          Igor Pogozhy
        </v-footer>

</v-app>
</template>

<script>
import DefaultNavbar from './DefaultNavbar.vue'
  export default {
  components: { DefaultNavbar },
    name:"layout",
    data:() => ({}),
    computed: {
    }
  }
</script>
<style lang="scss">
</style>
