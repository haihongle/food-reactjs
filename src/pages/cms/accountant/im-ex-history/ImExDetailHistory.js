import { useEffect, useState } from 'react';
import ImExDetailHistoryService from '../../../../services/accountantService/ImExDetailHistoryService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import Toast from '../../../../components/toast-message/ToastMessage';

export default function ImExDetailHistory({ repType }) {
	const [imExDetailHistory, setImExDetailHistory] = useState([]);
	const [pageCount, setPageCount] = useState(null);
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
		getRecipeList();
	}, [pagination]);

	const getRecipeList = async (page) => {
		try {
			const response = await ImExDetailHistoryService.getList(page, repType);
			if (response.success) {
				setImExDetailHistory(response.data);
				setPageCount(Math.ceil(response.data.length / pagination.size));
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<>
			<CardHeader pageCount={pageCount} paginateFunction={paginate} />
			<div className="card-body">
				<CustomTable
					data={imExDetailHistory}
					hiddenFields={['id', 'updatedAt', 'recipeId', 'materialId', 'createdBy', 'responsibleBy']}
				/>
			</div>
		</>
	);
}
