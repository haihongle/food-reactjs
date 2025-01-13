import { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router';
import orderSerivces from '../../../../services/orderServices/OrderService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import calculateTime from '../../../../utils/CaculateTime';

function calculateOrderTime(orders) {
	return orders.map((order) => {
		order.timeStatus = calculateTime.calculateOrderTime(order.createdAt);
		return order;
	});
}

function WaitingOrders({ status }) {
	const [newOrder, setNewOrder] = useState([]);
	const [detailData, setDetailData] = useState(null);
	const [order, setOrder] = useState([]);
	const [cancel, setCancel] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const cancelDetailRef = useRef('');
	const { filteredData } = useOutletContext();

	const sortOrders = (order) => {
		let sortedOrders = [...order];
		if (filteredData.orderby) {
			switch (filteredData.orderby) {
				case 'latest':
					sortedOrders.sort((a, b) => {
						const dateA = new Date(a.createdAt).getTime();
						const dateB = new Date(b.createdAt).getTime();
						return dateB - dateA;
					});
					break;
				default:
					break;
			}
		}

		setNewOrder(sortedOrders);
	};
	useEffect(() => {
		getNewOrder();
	}, [filteredData]);

	const getNewOrder = async () => {
		try {
			const response = await orderSerivces.getOrderList(status);
			if (response.success) {
				const updatedOrders = await calculateOrderTime(response.data);
				if (filteredData) {
					sortOrders(updatedOrders);
				} else {
					setNewOrder(updatedOrders);
				}
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};
	useEffect(() => {
		getNewOrder();
		const intervalId = setInterval(() => {
			setNewOrder((prevOrders) => calculateOrderTime(prevOrders));
		}, 60000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const createNewOrder = async (values) => {
		const newOrder = {
			...values,
			status: "WAITING",
		};
		await ServiceMethods.add(orderSerivces.createOrder, newOrder, getNewOrder);
	};

	const detailOrder = async (id) => {
		const data = await ServiceMethods.detail(orderSerivces.detailOrder, id);
		setDetailData(data);
	};

	const toggleOrder = async (id) => {
		const modalElement = document.getElementById('manageOrderModal');
		const modal = new window.bootstrap.Modal(modalElement);
		try {
			const response = await orderSerivces.detailOrder(id);
			if (response.success) {
				setOrder(response.data.orderDetaiList);
				modal.show();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const manageOrder = async (status) => {
		try {
			const cancelDetail = cancelDetailRef.current.value;
			console.log(order);

			if (cancel) {
				if (!cancelDetail) {
					Toast.warning('Please enter cancel detail');
					return;
				}
			}
			const response = await orderSerivces.changeOrderStatus(order[0].orderId, status);
			if (response.success) {
				Toast.success(`Order status changed to ${status}.`);
				setCancel(false);
				getNewOrder();
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const toggleCancel = () => {
		setCancel((previous) => !previous);
	};

	return (
		<>
			<div className="modal fade" data-bs-backdrop="static" tabIndex="-1" id="manageOrderModal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Manage order</h5>
							<button className="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">
								X
							</button>
						</div>
						<div className="modal-body">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th className="text-center">Menu Name</th>
										<th className="text-center">Quantity</th>
									</tr>
								</thead>
								<tbody>
									{order &&
										order.map((item, index) => (
											<tr key={index}>
												<td>{item.menuName}</td>
												<td className="text-center">{item.quantity}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						<div className="modal-footer">
							{!cancel && (
								<>
									<button
										className="btn btn-sm btn-primary"
										onClick={() => manageOrder('COMPLETED')}
									>
										Confirm order
									</button>
									<button className="btn btn-sm btn-danger" onClick={toggleCancel}>
										Cancel order
									</button>
								</>
							)}
							{cancel && (
								<>
									<textarea
										className="form-control"
										placeholder="Enter cancel detail..."
										ref={cancelDetailRef}
									/>
									<button className="btn btn-sm btn-primary" onClick={() => manageOrder('FAILED')}>
										Save
									</button>
									<button className="btn btn-sm btn-danger" onClick={toggleCancel}>
										Cancel
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<CustomModalForm
				title={'Create order'}
				modalID="createOrder"
				properties={[
					{
						label: 'Description',
						field: 'description',
						type: 'text',
						className: 'col-md-6',
					},
					{
						label: 'Promotion code',
						field: 'promotionCode',
						type: 'text',
						className: 'col-md-6',
					},
					{
						label: 'Customer name',
						field: 'fullName',
						type: 'text',
						validation: Yup.string().required('Customer name is required'),
						className: 'col-md-6',
					},
					{
						label: 'Address',
						field: 'address',
						type: 'text',
						validation: Yup.string().required('Address is required'),
						className: 'col-md-6',
					},
				]}
				detailProperties={[
					{
						label: 'Menu Id',
						field: 'menuId',
						type: 'number',
						validation: Yup.number().positive('Menu Id is invalid').required('Menu Id is required'),
					},
					{
						label: 'Quantity',
						field: 'quantity',
						type: 'number',
						validation: Yup.number()
							.positive('Quantity is in valid')
							.required('Quantity is required'),
					},
					{
						label: 'Note',
						field: 'note',
						type: 'text',
					},
				]}
				tableFieldName="detailList"
				submitFunction={(values) => createNewOrder(values)}
			/>
			<CustomModalDetail detailData={detailData} hiddenFields={['menuId', 'orderId']} />
			<div className="card-header">
				<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createOrder">
					Create order
				</button>
				<h2 className="text-center fw-bold">WAITING ORDERS</h2>
			</div>
			<div className="card-body">
				<CustomTable
					data={newOrder}
					actions={{
						detail: detailOrder,
						toggle: { function: toggleOrder, tooltip: 'Manage order' },
					}}
					hiddenFields={['id', 'updatedAt', 'timeStatus']}
				/>
			</div>
		</>
	);
}

export default WaitingOrders;
