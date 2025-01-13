import appLogin from '../../api/loginApi';

const login = async function (data) {
	try {
		const response = await appLogin.post('/login', data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const register = async function (data) {
    try {
        const response = await appLogin.post('/user-info/registerUser', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const authenServices = {
	login,
	register
};

export default authenServices;
