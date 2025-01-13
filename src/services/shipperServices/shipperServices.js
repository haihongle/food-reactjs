import app from '../../api/baseApi';

const takeOrder = async function (id, data) {
	try {
		const response = await app.put(`/orders/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const cancelOrder = async function (id, data) {
	try {
		const response = await app.put(`/orders/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const completeOrder = async function (id, data) {
	try {
		const response = await app.put(`/orders/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const shipperServices = {
	takeOrder,
	cancelOrder,
	completeOrder,
};

export default shipperServices;
