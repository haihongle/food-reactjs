import app from '../../api/baseApi';

const getReport = async function () {
	try {
		const response = await app.get('/accountant');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getProductFluctuation = async function (data) {
	try {
		const response = await app.post('/products-fluctuation', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const repportServices = {
	getProductFluctuation,
	getReport,
};

export default repportServices;
