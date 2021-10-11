import BaseService from "./BaseService";

export default class PresenceService extends BaseService{
	static get className () {
		return "presence" ;
	}
    static async filter(params){
        const response = await PresenceService.getService().get(`${this.className}/`+ params);
        return response.data;
    } 
     static async updateTime(id,data){
        const response = await PresenceService.getService().put(`${this.className}/`+ id,data);
        return response.data;
    }
}