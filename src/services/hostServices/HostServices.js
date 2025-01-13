import app from '../../api/baseApi';

const getOrderList = async function () {
	try {
		const response = await app.get('/orders');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createOrder = async function (data) {
	try {
		const response = await app.post('/orders', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateOrder = async function (id, data) {
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

const confirmPayment = async function (id, data) {
	try {
		const response = await app.put(`/orders/payment/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const hostServices = {
	getOrderList,
	createOrder,
	updateOrder,
	cancelOrder,
	confirmPayment,
};

export default hostServices;
