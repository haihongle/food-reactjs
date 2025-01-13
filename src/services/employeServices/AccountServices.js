import app from '../../api/baseApi';

const createAccount = async function (newAccount) {
	try {
		console.log(newAccount);
		const response = await app.post('/user-info/create-user', newAccount);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const deleteAccount = async function (id) {
	try {
		const response = await app.delete(`/account/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const accountServices = {
	createAccount,
	deleteAccount,
};

export default accountServices;
