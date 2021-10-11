<template>
  <div>
    <v-row justify="center" align="center">
      <v-col >
        <v-card class="pa-4 pa-6">
            <template v-if="errors">
            <template v-for="error in errors">
              <v-alert class="error white--text" :key="error.mesasge">
                {{ error.message }}
              </v-alert>
            </template>
          </template>
          <v-card-title class="ml-4">Register</v-card-title>
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
              outlined
              class="mx-4 mt-3"
              v-model="form.password"
              label="Password"
              type="password"
              required
            />
             <v-card-actions>
            <v-btn type="submit" color="primary" class="ml-4 text-capitalize"
              >Register</v-btn
            >
            <v-spacer />
            <v-btn color="primary" :to="{name:'login'}" text class="ml-4 text-capitalize"
              >I have a user!</v-btn
            >
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
  name: "Register",
  data() {
    return {
      form: {},
      errors: {},
    };
  },
  watch: {},
  methods: {
    async onSubmit() {
      const validId = this.isValidIsraeliID(this.form.tz);
      if (validId) {
        let res = await this.$store.dispatch(types.REGISTER, this.form);
        if (res.success) {
          this.$router.push({ name: "login" });
        }
        if (res.errors) {
          this.errors = res.errors;
        }
      } else {
        this.errors = {
          identity: { message: "Identity number is not real number!" },
        };
      }
    },
    isValidIsraeliID(tzInput) {
      let identity = String(tzInput).trim();
      if (identity.length > 9 || identity.length < 5 || isNaN(identity))
        return false;
      // Pad string with zeros up to 9 digits
      identity =
        identity.length < 9 ? ("00000000" + identity).slice(-9) : identity;

      return (
        Array.from(identity, Number).reduce((counter, digit, i) => {
          const step = digit * ((i % 2) + 1);
          return counter + (step > 9 ? step - 9 : step);
        }) %
          10 ===
        0
      );
    },
  },
};
</script>
