import app from '../../api/baseApi';

const getSalaryList = async function (data) {
	try {
		const response = await app.patch(`/employees/salary`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateSalary = async function (id, data) {
	try {
		const response = await app.patch(`/attendance/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const salaryServices = {
	getSalaryList,
	updateSalary,
};

export default salaryServices;
