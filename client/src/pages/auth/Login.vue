<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="mt-6 pa-6">
            <template v-if="errors">
            <template v-for="error in errors" >
              <v-alert class="error white--text" :key="error.mesasge">
                {{error.message}}
                </v-alert>
            </template>
          </template>
          <v-card-title class="ml-4">Login</v-card-title>
          <form @submit.prevent="onSubmit" >
            <v-text-field outlined class="mx-4 mt-3" v-model="form.tz" label="Identity Number"/>
            <v-text-field outlined class="mx-4 mt-3" v-model="form.password" label="Password" type="password" />
              <v-card-actions>
            <v-btn type="submit" color="primary" class="ml-4 text-capitalize">Login</v-btn>
            <v-spacer />
            <v-btn text class="ml-4 text-capitalize" color="primary" :to='{name:"register"}'>Register</v-btn>
          </v-card-actions>
          </form>

        
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { types } from "../../vuex/modules/auth.module";
export default {
  name: "Login",
  data() {
    return {
     form:{},
     errors:[]
    };
  },
  watch: {},
  methods: {
    async onSubmit(){
      let res = await this.$store.dispatch(types.LOGIN,this.form);
      if(res.success){
        this.$router.push({name:"users-view"});
      }else{
         this.errors = {
          identity: { message:res.message },
        };
      }
      if(res.errors){
       this.errors = res.errors;
      }
      
    }
  }
};
</script>
