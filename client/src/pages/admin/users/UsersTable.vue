<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #item.action="{ item }">
          <edit-btn @click="edit(item._id)" />
          <remove-btn @click="remove(item._id)" />
        </template> 
        <template #item.role="{ item }">
          <template v-if="item.role < 1">
            Admin
          </template>
          <template v-else >
            User
          </template>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import EditBtn from "../../../components/EditBtn.vue";
import RemoveBtn from '../../../components/RemoveBtn.vue';
import { types } from "../../../vuex/modules/users.module";

export default {
  components: { EditBtn, RemoveBtn },
  name: "users-table",
  data: () => ({
    headers: [
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Identity Number", value: "tz" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "action", sortable: false },
    ],
  }),
  computed: {
    users() {
      return this.$store.state.Users.users;
    },
  },
  methods: {
    edit(item) {
      this.$emit("edit", item);
    },
    remove(item){
      this.$emit("remove",item);
    }
  },
  async created() {
    await this.$store.dispatch(types.FETCH);
  },
};
</script>

<style>
</style>