<template>
 <v-container>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-toolbar>
            <v-toolbar-title> Presences </v-toolbar-title>
            <v-spacer />
            <v-btn class="text-capitalize" @click="createPresence({})">New Presences</v-btn>
          </v-toolbar>
          <v-card-text>
            <presences-table @edit="edit" @remove="remove" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <popup v-model="openModel">
          <presence-form v-if="openModel" @close="close"/>
        </popup>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {types} from "../../../vuex/modules/presences.module";
import {SweetAlert} from "../../../mixins/SwalMixin";
import swal from "sweetalert2";
import Popup from '../../../components/Popup.vue';
import PresencesTable from './PresencesTable.vue';
import PresenceForm from './PresenceForm.vue';
export default {
  components: { Popup, PresencesTable, PresenceForm },
name:"presence-view",
mixins: [SweetAlert],
  data: () => ({
    openModel: false,
  }),
  computed: {
    presence() {
      return this.$store.state.Presence.presence;
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
      if(res && res._id){
        this.alertSuccess();
      }
      }
      if(confirm.isDenied){
        swal.fire("Changes are not saved", "", "info");
      }
    },
    async createPresence(item) {
      await this.$store.commit(types.GET,item);
      this.openModel = true;
    },
    close(){
      this.openModel = false;
    }
  },
}
</script>

<style>

</style>