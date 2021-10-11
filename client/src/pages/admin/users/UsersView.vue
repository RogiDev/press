<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-toolbar>
            <v-toolbar-title> Users </v-toolbar-title>
            <v-spacer />
            <v-btn class="text-capitalize" @click="createUser({})">New User</v-btn>
          </v-toolbar>
          <v-card-text>
            <users-table @edit="edit" @remove="remove" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <popup v-model="openModel">
          <user-form v-if="openModel" @close="close"/>
        </popup>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Popup from "../../../components/Popup.vue";
import UserForm from "./UserForm.vue";
import UsersTable from "./UsersTable.vue";
import {types} from "../../../vuex/modules/users.module";
import { SweetAlert } from "../../../mixins/SwalMixin";
import swal from "sweetalert2";
export default {
  components: { UsersTable, Popup, UserForm },
  name: "users-view",
  mixins: [SweetAlert],
  data: () => ({
    openModel: false,
  }),
  computed: {
    user() {
      return this.$store.state.Users.user;
    },
  },
  methods: {
    async edit(item) {
      await this.$store.dispatch(types.GET,item);
        this.openModel = true;
    },
    async remove(item) {
      const confirm = await swal.fire({
        title: "Do you want to delete this user?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `no`,
      })
      if(confirm.isConfirmed){
      let res = await this.$store.dispatch(types.REMOVE,item)
      if(res){
        this.alertSuccess();
      }
      }
      if(confirm.isDenied){
        swal.fire("Changes are not saved", "", "info");
      }
    },
    async createUser(item) {
      await this.$store.commit(types.GET,item);
      this.openModel = true;
    },
    close(){
      this.openModel = false;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
