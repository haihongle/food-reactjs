import app from '../../api/baseApi';

const getProductFluctuation = async function (data) {
	try {
		const response = await app.post('/products-fluctuation', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getRevenue = async function (data) {
	try {
		const response = await app.post('/revenue', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const repportServices = {
	getProductFluctuation,
	getRevenue,
};

export default repportServices;
