import app from '../../api/baseApi';

const prefix = `inventory`;
const getList = async function (pagination) {
    try {
        const response = await app.get(prefix, {params: pagination});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getDetail = async function (id) {
    try {
        const response = await app.get(`/inventory/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const closeInventory = async function (data) {
    try {
        const response = await app.post(prefix, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteDish = async function (id) {
    try {
        const response = await app.delete(`/inventory/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const InventoryService = {
    getList,
    closeInventory,
    getDetail,
    deleteDish,
};

export default InventoryService;
