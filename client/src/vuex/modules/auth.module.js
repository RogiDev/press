import AuthService from "../../services/AuthService";
export const types = {
    LOGIN: "auth/login",
	GET: "auth/get",
	LOGOUT: "auth/logout",
	REGISTER: "auth/register",
	STORE: "auth/store",
	UPDATE: "auth/update",
}

export default {
state: {
      isAuth: false,
      user: null,
  },
  getters: {
      isAdmin: state => (state.user && state.user.role < 1)
  },
  mutations: {
    [types.LOGIN](state, payload) {
        state.user = payload.user;
        state.isAuth = true;
        if(state.user && state.user.role === 0){
            state.isAdmin = true;
        }
    }, 
    [types.LOGOUT](state) {
        state.user = null;
        state.isAuth = false;
    }
  },
  actions: {
    async [types.LOGIN](context, payload) {
        let res = await AuthService.login(payload);
        if(res){
            context.commit(types.LOGIN, res);
        }
        return res;
    },   
     async [types.REGISTER](context, payload) {
        let res = await AuthService.register(payload);
        return res;
    },
    async [types.LOGOUT](context) {
        let res = await AuthService.logout();
        if(res){
            context.commit(types.LOGOUT, res);
        }
        return res;
    }
  },
}