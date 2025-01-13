import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const appLogin = axios.create({
	baseURL,
	withCredentials: false,
	headers: {
		'Content-type': 'application/json',
	},
});

appLogin.interceptors.response.use(
	(response) => response,
	(error) => {
		const errMessage = error.response?.data?.err || 'An unknown error occurred';
		return Promise.reject(errMessage);
	}
);

export default appLogin;
