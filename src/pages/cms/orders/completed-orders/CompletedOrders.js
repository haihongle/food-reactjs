import { useEffect, useState } from 'react';
import orderSerivces from '../../../../services/orderServices/OrderService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';

function CompletedOrders({ status }) {
	const [completedOrder, setCompletedOrder] = useState([]);
	const [detailData, setDetailData] = useState(null);

	const getCompletedOrder = async () => {
		try {
			const response = await orderSerivces.getOrderList(status);
			if (response.success) {
				setCompletedOrder(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const detailOrder = async (id) => {
		const data = await ServiceMethods.detail(orderSerivces.detailOrder, id);
		setDetailData(data);
	};

	useEffect(() => {
		getCompletedOrder();
	}, []);

	return (
		<>
			<CustomModalDetail detailData={detailData} hiddenFields={[]} />
			<div className="card-header">
				<h2 className="text-center fw-bold">COMPLETED ORDERS</h2>
			</div>
			<div className="card-body">
				<CustomTable
					data={completedOrder}
					actions={{ detail: detailOrder }}
					hiddenFields={['id', 'updatedAt']}
				/>
			</div>
		</>
	);
}

export default CompletedOrders;
