import app from '../../api/baseApi';

const getList = async function () {
	try {
		const response = await app.get('/menus');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getDetail = async function (id) {
	try {
		const response = await app.get(`/menus/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateFood = async function (data) {
	try {
		const response = await app.post(`/menus/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteFood = async function (id) {
	try {
		const response = await app.delete(`/menus/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const menuServices = {
	getList,
	updateFood,
	getDetail,
	deleteFood,
};

export default menuServices;
