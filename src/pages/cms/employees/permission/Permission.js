import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import employeeServices from '../../../../services/employeServices/EmployeeServices';
import Table from '../../../../components/custom-table/CustomTable';
import { useState, useEffect } from 'react';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomPagination from '../../../../components/custom-pagination/CustomPagination';

function Permission() {
	const [problemList, setProblemList] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [pagination, setPagination] = useState({
		page: 1,
		size: 10,
	});

	const getProblemList = async () => {
		try {
			const response = await employeeServices.getList(pagination);
			if (response.success) {
				setProblemList(response.data);
				setPageCount(Math.ceil(response.total / pagination.size));
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error.message);
		}
	};

	const addProblem = async (employeeData) => {
		try {
			const response = await employeeServices.addNew(employeeData);
			if (response.success) {
				Toast.success(response.message);
				getProblemList();
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error.message || 'An error occurred while adding employee');
		}
	};

	const handlePageClick = (data) => {
		setPagination({
			page: data.selected,
			size: 10,
		});
	};

	useEffect(() => {
		getProblemList();
	}, [pagination]);

	return (
		<>
			<CustomModalForm
				title={'Add new employee'}
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
				formID="addProblem"
				modalID="employeeModal"
				submitFunction={() => addProblem('addProblem')}
			/>
			<div className="card-header d-flex justify-content-between">
				<div>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#employeeModal"
					>
						Add problem
					</button>
				</div>
				{pageCount > 0 && (
					<div>
						<CustomPagination pageCount={pageCount} handlePageClick={handlePageClick} />
					</div>
				)}
			</div>
			<div className="card-body">
				<Table data={problemList} />
			</div>
		</>
	);
}

export default Permission;
