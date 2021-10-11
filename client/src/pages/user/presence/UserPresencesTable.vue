<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="presences"
        :items-per-page="10"
        class="elevation-1"
      >
      <template #item.createdAt={item}>
        {{format(item.createdAt)}}
      </template>
       <template #item.endTime={item}>
        {{format(item.endTime)}}
      </template>
       <template #item.total={item}>
        {{total(item.createdAt,item.endTime)}} 
      </template>
        <template #item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="orange" icon @click="stopTime(item._id)" :disabled="item.endTime !== null">
                <v-icon> mdi-stop-circle </v-icon>
              </v-btn>
            </template>
            <span>Stop Time</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {types} from '../../../vuex/modules/presences.module';
import dayjs from "dayjs";
export default {
  components: { },
  name: "user-presences-table",
  props: { userId: String },
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
    }
  },
  methods: {
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
    async stopTime(item){
      let now = dayjs();
      let res = await this.$store.dispatch(types.UPDATE,{id:item,data:{endTime:now}});
      if(res && res._id){
        this.$emit('disabled',false);
      }
    },
  },
  async created() {
    await this.$store.dispatch(types.fetchUsers, this.userId);
  },
};
</script>

<style>
</style>