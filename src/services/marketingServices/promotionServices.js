import app from '../../api/baseApi';

const getPromotion = async function () {
	try {
		const response = await app.get('/promotions');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const createPromotion = async function (data) {
	try {
		const response = await app.post('/promotions', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deletePromotion = async function (id) {
	try {
		const response = await app.delete(`/promotions/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const promotionServices = {
	getPromotion,
	createPromotion,
	deletePromotion,
};

export default promotionServices;
