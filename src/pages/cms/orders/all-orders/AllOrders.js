import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import orderSerivces from '../../../../services/orderServices/OrderService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';

function AllOrders() {
	const [allOrder, setAllOrder] = useState([]);
	const [detailData, setDetailData] = useState(null);
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
		setAllOrder(sortedOrders);
	};
	useEffect(() => {
		getNewOrder();
	}, [filteredData]);

	const getNewOrder = async () => {
		try {
			const response = await orderSerivces.getOrderList();
			if (response.success) {
				if (filteredData) {
					sortOrders(response.data);
				} else {
					setAllOrder(response.data);
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
	}, []);

	const detailOrder = async (id) => {
		const data = await ServiceMethods.detail(orderSerivces.detailOrder, id);
		setDetailData(data);
	};

	return (
		<>
			<CustomModalDetail detailData={detailData} hiddenFields={[]} />
			<div className="card-header">
				<h2 className="text-center fw-bold">All ORDERS</h2>
			</div>
			<div className="card-body">
				<CustomTable
					data={allOrder}
					actions={{ detail: detailOrder }}
					hiddenFields={['id', 'updatedAt']}
				/>
			</div>
		</>
	);
}

export default AllOrders;
