import app from '../../api/baseApi';

const getOrderList = async function (status) {
	try {
		const response = await app.get('/order-dish', { params: { status: status } });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createOrder = async function (data) {
	try {
		const response = await app.post('/order-dish', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateOrder = async function (id, data) {
	try {
		const response = await app.put(`/order-dish/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const detailOrder = async function (id) {
	try {
		const response = await app.get(`/order-dish/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const cancelOrder = async function (id) {
	try {
		const response = await app.delete(`/order-dish/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const changeOrderStatus = async function (id, status) {
	try {
		const response = await app.post(`cms/order-dish/${id}/status`, status);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const respondToOrder = async function (id, data) {
	try {
		const response = await app.post(`/order-dish/${id}/response`, data);
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

const shipOrder = async function (id, data) {
	try {
		const response = await app.put(`/orders/shipping/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const history = async function (id, data) {
	try{
		const response = await app.get(`/orders/history/${id}`, data);
		return response.data;
	}
	catch (error) {
		throw error;
	}
}

const deleteOrder = async function (id) {
    try {
        const response = await app.delete(`/order-dish/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const orderServices = {
	getOrderList,
	createOrder,
	detailOrder,
	updateOrder,
	cancelOrder,
	respondToOrder,
	confirmPayment,
	shipOrder,
	changeOrderStatus,
	history,
	deleteOrder
};

export default orderServices;
