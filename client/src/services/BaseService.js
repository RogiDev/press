import axios from 'axios';
axios.defaults.baseURL ='http://localhost:4000/api' ;
const token = localStorage.getItem("token") ;
console.log(token)
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export default class BaseService {
    static getService(){
        return axios;
    }
    static async create (data) {

		return axios.post(this.className, data).then(
			(response) => {
				return response.data;
			}
		);
	}

	static update (id, data) {
		// if (data instanceof FormData) {
		// 	data.append("_method", "put");
		// } else {
		// 	data._method = "put";
		// }
		return axios.put(this.className + "/" + id, data).then(
			(response) => {
				return response.data;
			}
		);
	}

	static fetch (params = {}) {
		return axios.get(this.className, { params }).then(
			(response) => {
				return response.data;
			}
		);
	}

	static get (id, params = {}) {
		return axios.get(this.className + "/" + id, { params }).then(
			response => {
				if (response.data) {
					return response.data;
				} else {
					throw new Error(response.data);
				}
			}
		);
	}

	static remove (id, dataUrl = {}) {
		dataUrl._method = "delete";
		return axios.delete(this.className + "/" + id, dataUrl).then(
			response => {
				if (response.data) {
					return response.data;
				} else {
					throw new Error(response.data);
				}
			}
		);
	}

	static save (data) {
		if (data.id) {
			return this.update(data.id, data);
		} else {
			return this.create(data);
		}
	}

	static get className () {
		return null;
	}

	static removeFromArray (arr, obj) {
		const clone = arr.slice(0);
		const index = clone.indexOf(obj);
		if (index > -1) {
			clone.splice(index, 1);
		}
		return clone;
	}

	static removeFromArrayById (arr, id) {
		return arr.filter((o) => {
			return o.id != id;
		});
	}

	static UpdateArray (arr, obj) {
		const index = arr.indexOf(obj);
		if (index > -1) {
			arr[index] = obj;
			return true;
		}
		return false;
	}

	static UpdateArrayById (models, obj) {
		const clone = models.slice(0);
		const model = clone.find((model) => {
			return model.id === obj.id;
		});
		if (model) {
			Object.assign(model, obj);
		}
		return clone;
	}
}