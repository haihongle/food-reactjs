import app from '../../api/baseApi';

const getAttendanceList = async function () {
	try {
		const response = await app.get('/attendance/salary');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateAttendee = async function (id, data) {
	try {
		const response = await app.patch(`/attendance/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const salaryServices = {
	getAttendanceList,
	updateAttendee,
};

export default salaryServices;
