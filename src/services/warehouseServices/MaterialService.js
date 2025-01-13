import app from '../../api/baseApi';

const getMaterials = async function (pagination) {
	try {
		const response = await app.get('/materials', { params: pagination });
		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateMaterials = async function (id, data) {
	try {
		const response = await app.patch(`/materials/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const addMaterials = async function (data) {
	try {
		const response = await app.post('/materials', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteMaterials = async function (id) {
	try {
		const response = await app.delete(`/materials/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const detailMaterial = async function (id) {
	try {
		const response = await app.get(`/materials/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const MaterialService = {
	getMaterials,
	updateMaterials,
	addMaterials,
	deleteMaterials,
	detailMaterial,
};

export default MaterialService;
