import app from '../../api/baseApi';

const prefix = `menu-dish`;

const getList = async function (pagination, isActive) {
    try {
        const params = {...pagination, isActive};
        const response = await app.get(prefix, {params});
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

const createNew = async function (data) {
    try {
        const response = await app.post(prefix, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateDish = async function (id, data) {
    try {
        const response = await app.patch(`/${prefix}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteDish = async function (id) {
    try {
        const response = await app.delete(`/${prefix}/toggle/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const activeDish = async function (id) {
    try {
        const response = await app.patch(`${prefix}/toggle/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const menuServices = {
    getList,
    updateDish,
    createNew,
    getDetail,
    deleteDish,
    activeDish,
};

export default menuServices;
