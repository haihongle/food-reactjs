import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const baseURL = 'http://localhost:8080/api/v1';

const app = axios.create({
	baseURL,
	headers: {
		'Content-type': 'application/json',
	},
});

app.interceptors.request.use(
	(config) => {
		const token = cookies.get('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

app.interceptors.response.use(
	(response) => response,
	(error) => {
		const errMessage = error.response?.data?.err || 'An unknown error occurred';
		return Promise.reject(errMessage);
	}
);

export default app;
