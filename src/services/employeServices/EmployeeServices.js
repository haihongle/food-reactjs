import app from '../../api/baseApi';

const getList = async function (pagination) {
	try {
		const response = await app.get('/employee', { params: pagination });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getDetail = async function (id) {
	try {
		const response = await app.get(`/employees/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateInformation = async function (id, data) {
	try {
		const response = await app.post(`/employees/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const employeeServices = {
	getList,
	getDetail,
	updateInformation,
};

export default employeeServices;
