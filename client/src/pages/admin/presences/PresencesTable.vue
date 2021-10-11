<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="presences"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #item.action="{ item }">
          <edit-btn @click="edit(item._id)" />
          <remove-btn @click="remove(item._id)" />
        </template>
         <template #item.createdAt={item}>
        {{format(item.createdAt)}}
      </template>
       <template #item.endTime={item}>
        {{format(item.endTime)}}
      </template> 
      <template #item.total={item}>
        {{total(item.createdAt,item.endTime)}} 
      </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import EditBtn from "../../../components/EditBtn.vue";
import RemoveBtn from "../../../components/RemoveBtn.vue";
import { types } from "../../../vuex/modules/presences.module";
import dayjs from "dayjs";
export default {
  components: { EditBtn, RemoveBtn },
  name: "presences-table",
  data: () => ({
    headers: [
      { text: "First Name", value: "user.firstName" },
      { text: "Last Name", value: "user.lastName" },
      { text: "Start", value: "createdAt" },
      { text: "End", value: "endTime" },
      { text: "Total", value: "total" },
      { text: "Actions", value: "action", sortable: false },
    ],
  }),
  computed: {
    presences() {
      return this.$store.state.Presence.presences;
    },
  },
  methods: {
    edit(item) {
      this.$emit("edit", item);
    },
    remove(item) {
      this.$emit("remove", item);
    },
    format(date){
      if(date !== null){
        return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
      }else{
        return "";
      }
    },
     total(start,end){
      if(start && end){
        return dayjs(end).diff(start,"minute") +" "+ "minutes"
         
      }else{
        return ""
      }
    },
  },
  async created() {
    await this.$store.dispatch(types.FETCH);
  },
};
</script>

<style>
</style>