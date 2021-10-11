<template>
<v-row>
    <v-col>
 <v-card>
     
    <form @submit.prevent="onSubmit">
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.email"
        label="Email"
        type="email"
        required
      />
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.tz"
        label="Identity Number"
        required
      />
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.firstName"
        label="First Name"
        required
      />
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.lastName"
        label="Last Name"
        required
      />
  

      <v-text-field
      v-if="newUser"
        outlined
        class="mx-4 mt-3"
        v-model="form.password"
        label="Password"
        type="password"
        required
      />

     
      <v-card-actions>
        <v-btn type="submit" color="primary" class="ml-4 text-capitalize"
          >Submit</v-btn
        >
      </v-card-actions>
    </form>
  </v-card>
    </v-col>
</v-row>
 
</template>
<script>
import { types } from "../../../vuex/modules/users.module";
export default {
  name: "user-form",
  data: () => ({
    form: {},
  }),
  computed: {
    user() {
      return this.$store.state.Users.user;
    },
    newUser(){
        return (this.user && Object.keys(this.user).length === 0)
    }
  },
  methods: {
    async onSubmit() {
      if(!this.newUser){
        let res = await this.$store.dispatch(types.UPDATE,{id:this.form._id,data:this.form})
        if(res && res._id){
            this.$emit("close")
        }
      }else{
          let res = await this.$store.dispatch(types.CREATE,this.form)
          if(res){
            this.$emit("close")
        }
      }
    },
  },
  created() {
      if(this.user){
          this.form = Object.assign({}, this.user);
      }
  },
};
</script>
