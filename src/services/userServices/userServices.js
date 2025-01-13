import app from '../../api/baseApi';

const getUserVoucher = async function (data) {
	try {
		const response = await app.post('/user/orders/vouchers', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const order = async function (data) {
	try {
		const response = await app.post('/user/orders', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const rateOrder = async function (data) {
	try {
		const response = await app.post('/user/orders/ratting', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const userServices = {
	getUserVoucher,
	order,
	rateOrder,
};

export default userServices;
