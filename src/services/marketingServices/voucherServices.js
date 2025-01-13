import app from '../../api/baseApi';

const getVoucher = async function () {
	try {
		const response = await app.get('/vouchers');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createVoucher = async function (data) {
	try {
		const response = await app.post('/vouchers', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteVoucher = async function (id) {
	try {
		const response = await app.delete(`/vouchers/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const voucherServices = {
	getVoucher,
	createVoucher,
	deleteVoucher,
};

export default voucherServices;
