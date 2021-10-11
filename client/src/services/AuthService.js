import BaseService from "./BaseService";

export default class AuthService extends BaseService {
	static get className () {
		return "auth";
	}

	static async login (params) {
        try{
		const response = await AuthService.getService().post(`${this.className}/login`, params);
        if(response.data){
            localStorage.setItem("token",response.data.user.accessToken);
        }
        return response.data;
        }catch(err){
            return err.response.data;
        }
	}

	static async register (data) {
        try{
		const response = await AuthService.getService().post(`${this.className}/register`, data);
        return response.data;
        }catch(err){
            return err.response.data;
        }
	}

	static async getAuth () {
        try{
		const response = await AuthService.getService().get(`${this.className}/getAuth`);
        localStorage.removeItem("vuex");
        localStorage.removeItem("token");
        return response.data;
        }catch(err){
            return err.response.data
        }
	}

	static async logout () {
        try{
		const response = await AuthService.getService().post(`${this.className}/logout`);
        return response.data;
        }catch(err){
            return err.response.data
        }
	}
}
