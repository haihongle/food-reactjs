import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ServiceMethods from '../../../../utils/ServiceMethods';
import customerServices from '../../../../services/customerServices/CustomerServices';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';

function CustomerList() {
	const [customerList, setCustomerList] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [detailData, setDetailData] = useState(null);
	const [pagination, setPagination] = useState({
		page: 0,
		size: 10,
	});
	const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
	const navigate = useNavigate(); // Để chuyển hướng khi không có quyền

	// Kiểm tra quyền truy cập
	useEffect(() => {
		// if (!user || user.role !== 'USER' || user.role !== 'BOSS') {
		// 	alert('You do not have permission to access this page.');
		// 	navigate('/'); // Chuyển hướng về trang chính nếu không có quyền
		// }
	}, [user, navigate]);

	// Cập nhật trang khi phân trang
	const paginate = ({ selected }) => {
		setPagination({
			page: selected,
			size: 10,
		});
	};

	// Lấy danh sách khách hàng
	useEffect(() => {
		getCustomerList();
	}, [pagination]);

	const getCustomerList = async () => {
		await ServiceMethods.get(customerServices.getList, pagination, (data) => {
			setCustomerList(data);
			setPageCount(Math.ceil(data.length / pagination.size));
		});
	};

	// Thêm khách hàng mới
	const addCustomer = async (values) => {
		await ServiceMethods.add(customerServices.addNew, values, getCustomerList);
	};

	// Xem chi tiết khách hàng
	const detailCustomer = async (id) => {
		const data = await ServiceMethods.detail(customerServices.getDetail, id);
		setDetailData(data);
	};

	// Cập nhật thông tin khách hàng
	const updateCustomer = async (oldData, updatedData) => {
		const onSuccess = async (menuId) => {
			await detailCustomer(menuId);
			await getCustomerList();
		};
		updatedData.updatedBy = user?.username || null;
		await ServiceMethods.update(
			customerServices.updateCustomer,
			oldData.customerId,
			updatedData,
			onSuccess
		);
	};

	// Xóa khách hàng
	const deleteCustomer = async (id) => {
		await ServiceMethods.add(customerServices.deleteCustomer, id, getCustomerList);
	};

	return (
		<>
			<CustomModalForm
				title={'Add new customer'}
				properties={[
					{
						label: 'Full name',
						field: 'fullname',
						type: 'text',
						validation: Yup.string().required('Full name is required'),
						className: 'col-md-6',
					},
					{
						label: 'Email',
						field: 'email',
						type: 'text',
						validation: Yup.string().email('Invalid email format').required('Email is required'),
						className: 'col-md-6',
					},
					{
						label: 'Phone number',
						field: 'phonenumber',
						type: 'number',
						validation: Yup.string()
							.matches(/^(?:\d{10}|\d{11})$/, 'Phone number must be 10 or 11 digits')
							.required('Phone number is required'),
						className: 'col-md-6',
					},
					{
						label: 'Age',
						field: 'age',
						type: 'number',
						validation: Yup.number().positive('Age must be positive').required('Age is required'),
						className: 'col-md-6',
					},
				]}
				modalID="customerModal"
				submitFunction={(values) => addCustomer(values)}
			/>
			<CustomModalDetail detailData={detailData} actions={{ update: updateCustomer }} />
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				modalID={'#customerModal'}
				buttonName={'Add new customer'}
			/>
			<div className="card-body">
				<CustomTable data={customerList} />
			</div>
		</>
	);
}

export default CustomerList;
