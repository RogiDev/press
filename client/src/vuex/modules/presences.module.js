import PresenceService from "../../services/PresenceService";
import AdminPresenceService from "../../services/AdminPresenceService";
export const types = {
  fetchUsers: "user/my-presences",
  UPDATE_TIME: "user/update-time",
  GET: "presences/get",
  FETCH: "presences/fetch",
  REMOVE: "presences/remove",
  CREATE: "presences/create",
  UPDATE: "presences/update",
};

export default {
  state: {
    presences: [],
    presence: {},
  },
  mutations: {
    [types.FETCH](state, payload) {
      state.presences = payload;
    },
    [types.GET](state, payload) {
      state.presence = payload;
    },
    [types.REMOVE](state, payload) {
        const index = state.presences.findIndex( (presence) => presence._id === payload._id);
        if (index > -1) {
            state.presences.splice(index, 1);
        }
        
    },
    [types.UPDATE](state, payload) {
      const presence = state.presences.findIndex(
        (presence) => presence._id === payload._id
      );
      state.presences.splice(presence, 1, payload);
    },
    [types.UPDATE_TIME](state, payload) {
      const presence = state.presences.findIndex(
        (presence) => presence._id === payload._id
      );
      state.presences.splice(presence, 1, payload);
    },
    [types.CREATE](state, payload) {
      state.presences.push(payload);
    },
    [types.fetchUsers](state, payload) {
      state.presences = payload;
    },
  },
  actions: {
    async [types.fetchUsers](context, payload) {
      let res = await PresenceService.filter(payload);
      if (res) {
        context.commit(types.fetchUsers, res);
      }
      return res;
    },
    async [types.FETCH](context, payload) {
      let res = await AdminPresenceService.fetch(payload);
      if (res) {
        context.commit(types.FETCH, res);
      }
      return res;
    },
    async [types.GET](context, payload) {
      let res = await AdminPresenceService.get(payload);
      if (res) {
        context.commit(types.GET, res);
      }
      return res;
    },
    async [types.REMOVE](context, payload) {
      let res = await AdminPresenceService.remove(payload);
      if (res) {
        context.commit(types.REMOVE, res);
      }
      return res;
    },
    async [types.CREATE](context, payload) {
      console.log(payload);
      let res = await AdminPresenceService.create(payload);
      if (res) {
        context.commit(types.CREATE, res);
      }
      return res;
    },
    async [types.UPDATE](context, payload) {
      let res = await AdminPresenceService.update(payload.id, payload.data);
      if (res) {
        context.commit(types.UPDATE, res);
      }
      return res;
    },
     async [types.UPDATE_TIME](context, payload) {
      let res = await PresenceService.update(payload.id, payload.data);
      if (res) {
        context.commit(types.UPDATE, res);
      }
      return res;
    }
  },
};
