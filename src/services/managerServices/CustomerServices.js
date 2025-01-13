import app from '../../api/baseApi';

const customerGetList = async function () {
	try {
		const response = await app.get('/customers');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const customerAddNew = async function (data) {
	try {
		const response = await app.post('/customers', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const customerGetDetail = async function (id) {
	try {
		const response = await app.get(`/customers/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const customerApplyVoucher = async function (data) {
	try {
		const response = await app.put(`/customers/voucher/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const customerServices = {
	customerGetList,
	customerAddNew,
	customerGetDetail,
	customerApplyVoucher,
};

export default customerServices;
