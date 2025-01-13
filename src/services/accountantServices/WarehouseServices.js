import app from '../../api/baseApi';

const getProduct = async function () {
	try {
		const response = await app.get('/products');
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateProduct = async function (id, data) {
	try {
		const response = await app.put(`/products/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const addProduct = async function (data) {
	try {
		const response = await app.post('/products', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteProduct = async function (id) {
	try {
		const response = await app.delete(`/products/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const checkExpired = async function (data) {
	try {
		const response = await app.post('/expired-product', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const warehouseServices = {
	getProduct,
	updateProduct,
	addProduct,
	deleteProduct,
	checkExpired,
};

export default warehouseServices;
