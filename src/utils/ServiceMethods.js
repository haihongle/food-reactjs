import Toast from '../components/toast-message/ToastMessage';

const ServiceMethods = {
	async get(serviceFunction, pagination, onSuccess) {
		try {
			const response = await serviceFunction(pagination);
			if (response.success) {
				if (onSuccess) onSuccess(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	},

	async add(serviceFunction, values, onSuccess) {
		try {
			const response = await serviceFunction(values);
			if (response.success) {
				if (onSuccess) onSuccess();
				Toast.success(response.message);
				return response.success;
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	},

	async detail(serviceFunction, id) {
		try {
			const response = await serviceFunction(id);
			if (response.success) {
				return response.data;
			} else {
				Toast.error(response.message);
				return null;
			}
		} catch (error) {
			Toast.error(error);
			return null;
		}
	},

	async update(serviceFunction, id, data, onSuccess) {
		try {
			const response = await serviceFunction(id, data);
			if (response.success) {
				Toast.success(response.message);
				if (onSuccess) onSuccess();
				return response.success;
			} else {
				Toast.error(response.message);
				return null;
			}
		} catch (error) {
			Toast.error(error);
		}
	},

	async delete(serviceFunction, id, onSuccess) {
		try {
			const response = await serviceFunction(id);
			if (response.success) {
				if (onSuccess) onSuccess();
				Toast.success(response.message);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	},

	async toggleById(serviceFunction, id, onSuccess) {
		try {
			const response = await serviceFunction(id);
			if (response.success) {
				Toast.success(response.message);
				if (onSuccess) onSuccess();
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	},

	async toggleByData(serviceFunction, data, onSuccess) {
		try {
			const response = await serviceFunction(data);
			if (response.success) {
				Toast.success(response.message);
				if (onSuccess) onSuccess();
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	},
};

export default ServiceMethods;
