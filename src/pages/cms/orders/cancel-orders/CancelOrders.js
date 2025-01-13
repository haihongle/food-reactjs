import { useEffect, useState } from 'react';
import orderSerivces from '../../../../services/orderServices/OrderService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';

function CancelOrders({ status }) {
	const [cancelOrder, setCancelOrder] = useState([]);
	const [detailData, setDetailData] = useState(null);

	const getCancelOrder = async () => {
		try {
			const response = await orderSerivces.getOrderList(status);
			if (response.success) {
				setCancelOrder(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	useEffect(() => {
		getCancelOrder();
	}, []);

	const detailOrder = async (id) => {
		const data = await ServiceMethods.detail(orderSerivces.detailOrder, id);
		setDetailData(data);
	};

	return (
		<>
			<CustomModalDetail detailData={detailData} hiddenFields={[]} />
			<div className="card-header">
				<h2 className="text-center fw-bold">CANCELED ORDERS</h2>
			</div>
			<div className="card-body">
				<CustomTable
					data={cancelOrder}
					actions={{ detail: detailOrder }}
					hiddenFields={['id', 'updatedAt']}
				/>
			</div>
		</>
	);
}

export default CancelOrders;
