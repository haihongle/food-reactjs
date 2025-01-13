import app from '../../api/baseApi';

const prefix = `inventory/history-list`;

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
        const response = await app.get(`/${prefix}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const InventoryHistoryService = {
    getList,
    getDetail
};

export default InventoryHistoryService;
