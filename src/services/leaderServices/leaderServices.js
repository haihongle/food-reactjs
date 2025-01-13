import app from '../../api/baseApi';

const getEmpList = async function (data) {
	try {
		const response = await app.post('/today-employees', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const arrangeSchedule = async function (data) {
	try {
		const response = await app.post('/schedule', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const handleProblem = async function (data) {
	try {
		const response = await app.post('/problems', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const leaderServices = {
	getEmpList,
	arrangeSchedule,
	handleProblem,
};

export default leaderServices;
