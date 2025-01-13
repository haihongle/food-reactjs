import app from '../../api/baseApi';

const createPurchaseOrder = async function (data) {
	try {
		const response = await app.post('/purchase-orders', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createReceiveNote = async function (data) {
	try {
		const response = await app.post('/received-notes', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createDeliveryNote = async function (data) {
	try {
		const response = await app.post('/delivery-notes', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const stockServices = {
	createPurchaseOrder,
	createReceiveNote,
	createDeliveryNote,
};

export default stockServices;
