import UserService from "../../services/UserService";

export const types = {
    GET: "users/get",
    FETCH:  "users/fetch",
    REMOVE:  "user/remove",
    CREATE: "users/create",
    UPDATE:  "users/update",
}

export default {
state: {
     users:[],
     user:{}
  },
  mutations: {
    [types.FETCH](state, payload) {
       state.users = payload
    }, 
    [types.GET](state,payload) {
        state.user = payload;
    },
    [types.REMOVE](state,payload) {
        state.users.filter(user => user._id !== payload.user_id)
    },
    [types.UPDATE](state,payload) {
        console.log(payload,"update payload")
        const user = state.users.findIndex(user => user._id === payload._id)
        state.users.splice(user, 1, payload)
    },
    [types.CREATE](state,payload) {
        state.users.push(payload.user);
    },
  },
  actions: {
    async [types.FETCH](context) {
        let res = await UserService.fetch();
        if(res){
            context.commit(types.FETCH, res);
        }
        return res;
    },   
     async [types.GET](context, payload) {
        let res = await UserService.get(payload);
        if(res){
            context.commit(types.GET, res);
        }
        return res;
    },
    async [types.REMOVE](context,payload) {
        let res = await UserService.remove(payload);
        if(res){
            context.commit(types.REMOVE, res);
        }
        return res;
    }, 
    async [types.UPDATE](context,payload) {
        let res = await UserService.update(payload.id,payload.data);
        if(res){
            context.commit(types.UPDATE, res);
        }
        return res;
    },
     async [types.CREATE](context,payload) {
        let res = await UserService.create(payload);
        if(res){
            context.commit(types.CREATE, res);
        }
        return res;
    }
  }
}