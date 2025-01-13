import { useEffect, useState, useRef } from 'react';
import InventoryService from '../../../../services/warehouseServices/InventoryService';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import Toast from '../../../../components/toast-message/ToastMessage';
import calculateTime from '../../../../utils/CaculateTime';

function calculateInventoryTime(inventory) {
	return inventory.map((item) => {
		item.timeStatus = calculateTime.calculateInventoryTime(item.createdAt, item.shelfLife);
		return item;
	});
}

function Inventory() {
	const [currentInventory, setCurrentInventory] = useState([]);
	const [pageCount, setPageCount] = useState(null);
	const [detailData, setDetailData] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const descriptionRef = useRef();
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
		getInventory();
	}, [pagination]);

	const getInventory = async () => {
		try {
			const response = await InventoryService.getList(pagination);
			if (response.success) {
				const updatedInventory = await calculateInventoryTime(response.data);
				setCurrentInventory(updatedInventory);
				setPageCount(response.metaData.totalPage)
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const closeInventory = async () => {
		const data = {
			description: descriptionRef.current.value,
			isManualClosing: true,
		};
		try {
			const response = await InventoryService.closeInventory(data);
			if (response.success) {
				descriptionRef.current.value = '';
				Toast.success(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<>
			<div className="modal fade" data-bs-backdrop="static" tabIndex="-1" id="closeInventoryModal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Closing inventory</h5>
							<button className="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">
								X
							</button>
						</div>
						<div className="modal-body">
							<textarea
								className="form-control"
								placeholder="Description..."
								ref={descriptionRef}
							/>
						</div>
						<div className="modal-footer">
							<button className="btn btn-sm btn-primary" onClick={closeInventory}>
								Confirm
							</button>
							<button
								className="btn btn-sm btn-danger"
								data-bs-dismiss="modal"
								onClick={() => {
									descriptionRef.current.value = '';
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				modalID={'#closeInventoryModal'}
				buttonName={'Closing inventory'}
			/>
			<div className="card-body">
				<CustomTable
					data={currentInventory}
					hiddenFields={[
						'id',
						'updatedBy',
						'updatedAt',
						'inventoryHistoryId',
						'timeStatus',
						'lifeLeft',
					]}
				/>
			</div>
		</>
	);
}

export default Inventory;
