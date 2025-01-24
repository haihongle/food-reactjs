import app from '../../api/baseApi';

// Lấy danh sách đơn hàng của người dùng
const getOrdersByUser = async function (params) {
	try {
		const response = await app.get('/order-dish/my-orders', params);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Thêm đơn hàng mới
const addNew = async function (data) {
	try {
		const response = await app.post('/order-dish', data); 
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Cập nhật đơn hàng
const updateOrder = async function (id, data) {
	try {
		const response = await app.put(`/order-dish/${id}`, data); 
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Lấy chi tiết đơn hàng
const getDetail = async function (id) {
	try {
		const response = await app.get(`/order-dish/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Xóa đơn hàng
const deleteOrder = async function (id) {
	try {
		const response = await app.delete(`/order-dish/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Áp dụng voucher cho đơn hàng (nếu cần)
const applyVoucher = async function (data, id) {
	try {
		const response = await app.put(`/order-dish/voucher/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Export các hàm này để sử dụng trong component
const customersSevices = {
	getOrdersByUser,
	addNew,
	updateOrder,
	getDetail,
	deleteOrder,
	applyVoucher,
};

export default customersSevices;
