import app from '../../api/baseApi';

const getList = async function (pagination) {
	try {
		const response = await app.get('/customers', { params: pagination });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const addNew = async function (data) {
	try {
		const response = await app.post('/customers', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateCustomer = async function (id, data) {
	try {
		const response = await app.post(`/customers/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getDetail = async function (id) {
	try {
		const response = await app.get(`/customers/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteCustomer = async function (id) {
	try {
		const response = await app.delete(`/customers/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const applyVoucher = async function (data, id) {
	try {
		const response = await app.put(`/customers/voucher/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const customerServices = {
	getList,
	addNew,
	updateCustomer,
	getDetail,
	deleteCustomer,
	applyVoucher,
};

export default customerServices;
