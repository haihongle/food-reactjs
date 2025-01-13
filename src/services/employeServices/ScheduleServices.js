import app from '../../api/baseApi';

const getTodayList = async function (data) {
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

const scheduleServices = {
	getTodayList,
	arrangeSchedule,
};

export default scheduleServices;
