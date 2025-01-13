import app from '../../api/baseApi';

const prefix = `im-ex-recipe`;

const getList = async function (pagination, repType) {
    try {
        const params = { ...pagination, repType };
        const response = await app.get(prefix, { params });
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

const ImExRecipeService = {
    getList,
    getDetail,
    createNew
};

export default ImExRecipeService;
