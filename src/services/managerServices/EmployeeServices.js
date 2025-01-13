import app from '../../api/baseApi';

const getEmpList = async function () {
	try {
		const response = await app.get('/employees');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getEmpDetail = async function (id) {
	try {
		const response = await app.get(`/employees/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateEmp = async function (id, data) {
	try {
		const response = await app.post(`/employees/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const employeeServices = {
	getEmpList,
	getEmpDetail,
	updateEmp,
};

export default employeeServices;
