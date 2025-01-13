import app from '../../api/baseApi';

const prefix = `im-ex-recipe/detail-list`;

const getList = async function (pagination, repType) {
    try {
        const params = {...pagination, repType};
        const response = await app.get(prefix, {params});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const ImExDetailHistoryService = {
    getList
};

export default ImExDetailHistoryService;
