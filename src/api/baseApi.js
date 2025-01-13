import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const app = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		'Content-type': 'application/json',
	},
});

app.interceptors.response.use(
	(response) => response,
	(error) => {
		const errMessage = error.response?.data?.err || 'An unknown error occurred';
		return Promise.reject(errMessage);
	}
);

export default app;
