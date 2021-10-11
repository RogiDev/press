<template>
<v-row>
    <v-col>
 <v-card>
     
    <form @submit.prevent="onSubmit">
      <users-list v-model="form.user" required />
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.createdAt"
        label="Start"
        type="datetime-local"
        required
      />
      <v-text-field
        outlined
        class="mx-4 mt-3"
        v-model="form.endTime"
        label="End"
        type="datetime-local"
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
import UsersList from '../users/UsersList.vue';
 import { types  } from "../../../vuex/modules/presences.module";
export default {
  components: { UsersList },
  name: "presence-form",
  data: () => ({
    form: {},
  }),
  computed: {
    presence() {
      return this.$store.state.Presence.presence;
    },
  },
  methods: {
    async onSubmit() {
      if(this.form._id){
        await this.$store.dispatch(types.UPDATE,{id:this.form._id,data:this.form})
        this.$emit('close')
      }else{
        console.log(this.from);
        await this.$store.dispatch(types.CREATE,this.form)
        this.$emit('close')
      }
    },
    
  },
  created() {
    this.form = Object.assign({}, this.presence);
  },
};
</script>
