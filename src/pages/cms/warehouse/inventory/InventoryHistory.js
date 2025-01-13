import { useEffect, useState } from 'react';
import InventoryHistoryService from '../../../../services/warehouseServices/InventoryHistoryService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';

export default function InventoryHistory() {
	const [inventoryHistory, setInventoryHistory] = useState([]);
	const [pageCount, setPageCount] = useState(null);
	const [detailData, setDetailData] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const [pagination, setPagination] = useState({
		page: 0,
		size: 10,
	});

	const paginate = ({ selected }) => {
		setPagination({
			page: selected,
			size: 10,
		});
	};
	useEffect(() => {
		getInventoryHistoryList();
	}, [pagination]);

	const getInventoryHistoryList = async () => {
		await ServiceMethods.get(InventoryHistoryService.getList, pagination, (data) => {
			setInventoryHistory(data);
			setPageCount(Math.ceil(data.length / pagination.size));
		});
	};

	const detailInventoryHistory = async (id) => {
		const data = await ServiceMethods.detail(InventoryHistoryService.getDetail, id);
		setDetailData(data);
	};

	return (
		<>
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				detailData={detailData}
				hiddenFields={['id']}
			/>
			<CustomModalDetail detailData={detailData} hiddenFields={['id']} />
			<div className="card-body">
				<CustomTable
					data={inventoryHistory}
					actions={{
						detail: detailInventoryHistory,
					}}
					hiddenFields={['id', 'updatedAt', 'createdAt', 'reportedBy']}
				/>
			</div>
		</>
	);
}
