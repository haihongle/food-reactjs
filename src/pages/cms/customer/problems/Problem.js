import { useState, useEffect } from 'react';
import customerServices from '../../../../services/customerServices/CustomerServices';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';

function Problem() {
	const [problemList, setProblemList] = useState([]);
	const [pageCount, setPageCount] = useState(10);
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
		getproblemList();
	}, [pagination]);

	const getproblemList = async () => {
		await ServiceMethods.get(customerServices.getList, pagination, (data) => {
			setProblemList(data);
			setPageCount(Math.ceil(data.length / pagination.size));
		});
	};

	const addProblem = async (values) => {
		await ServiceMethods.add(customerServices.addNew, values, getproblemList);
	};

	return (
		<>
			<CustomModalForm
				title={'Add new customer'}
				properties={[
					{
						field: 'Name',
						type: 'input',
					},
					{
						field: 'Age',
						type: 'input-number',
					},
					{
						field: 'Email',
						type: 'input',
					},
					{
						field: 'Address',
						type: 'input',
					},
				]}
				modalID="problemModal"
				submitFunction={(values) => addProblem(values)}
			/>
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				modalID={'#problemModal'}
				buttonName={'Add problems'}
			/>
			<div className="card-body">
				<CustomTable data={problemList} />
			</div>
		</>
	);
}

export default Problem;
