<template>
 <v-container v-if="user">
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-toolbar>
            <v-toolbar-title> Presences </v-toolbar-title>
            <v-spacer />
            <v-btn class="text-capitalize" @click="createPresence" :disabled="disable"  >New Presence</v-btn>
          </v-toolbar>
          <v-card-text>
            <user-presences-table :userId="user.id" @disabled="disabled"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SweetAlert } from '../../../mixins/SwalMixin';
import { types } from "../../../vuex/modules/presences.module";
import UserPresencesTable from "./UserPresencesTable.vue";
export default {
  components: { UserPresencesTable },
  name: "user-presence-view",
  mixins: [SweetAlert],
  data: () => ({
    disable:false
  }),
  computed: {
    user() {
      return this.$store.state.Auth.user;
    },
  },
  methods: {
    async createPresence(){
      const res = await this.$store.dispatch(types.CREATE, { user: this.user.id });
      if(res && res._id){
        this.alertSuccess()
        this.disable = true;
      }else{
        this.alertError()
      }
    },
    disabled(item){
      this.disable = item;
    }
  },
};
</script>

<style>
</style>