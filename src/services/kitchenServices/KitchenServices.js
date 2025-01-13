import app from '../../api/baseApi';

const checkGood = async function (data) {
	try {
		const response = await app.post('/goods', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const responeOrder = async function (id, data) {
	try {
		const response = await app.post(`/orders/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createFood = async function (data) {
	try {
		const response = await app.post('/foods', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const kitchenServices = {
	checkGood,
	responeOrder,
	createFood,
};

export default kitchenServices;
