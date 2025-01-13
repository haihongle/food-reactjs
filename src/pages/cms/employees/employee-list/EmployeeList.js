import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import employeeServices from '../../../../services/employeServices/EmployeeServices';
import ServiceMethods from '../../../../utils/ServiceMethods';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';

function EmployeeList() {
	const [employeeList, setEmployeeList] = useState([]);
	const [pageCount, setPageCount] = useState(0);
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
		getEmployeeList();
	}, [pagination]);

	const getEmployeeList = async () => {
		await ServiceMethods.get(employeeServices.getList, pagination, (data) => {
			setEmployeeList(data);
			setPageCount(Math.ceil(data.length / pagination.size));
		});
	};

	const addEmployee = async (values) => {
		await ServiceMethods.add(employeeServices.updateInformation, values, getEmployeeList);
	};

	const detailEmployee = async (id) => {
		const data = await ServiceMethods.detail(employeeServices.getDetail, id);
		setDetailData(data);
	};

	const updateEmployee = async (updatedData) => {
		const { menuDishId, menuDishName, materialList, ...rest } = updatedData;
		const requestUpdatedData = {
			...rest,
			name: menuDishName,
			menuDishDetailList: materialList,
			updatedBy: user?.username || null,
		};
		await ServiceMethods.update(
			employeeServices.updateInformation,
			menuDishId,
			requestUpdatedData,
			getEmployeeList
		);
	};

	// const arrayWithTwoObjects = [
	// 	{
	// 		id: 1,
	// 		name: 'John Doe',
	// 		age: 30,
	// 		gender: 'Male',
	// 		occupation: 'Engineer',
	// 		city: 'New York',
	// 		country: 'USA',
	// 		email: 'john.doe@example.com',
	// 		phone: '123-456-7890',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Jane Smith',
	// 		age: 28,
	// 		gender: 'Female',
	// 		occupation: 'Designer',
	// 		city: 'Los Angeles',
	// 		country: 'USA',
	// 		email: 'jane.smith@example.com',
	// 		phone: '987-654-3210',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Jane Smith',
	// 		age: 28,
	// 		gender: 'Female',
	// 		occupation: 'Designer',
	// 		city: 'Los Angeles',
	// 		country: 'USA',
	// 		email: 'jane.smith@example.com',
	// 		phone: '987-654-3210',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Jane Smith',
	// 		age: 28,
	// 		gender: 'Female',
	// 		occupation: 'Designer',
	// 		city: 'Los Angeles',
	// 		country: 'USA',
	// 		email: 'jane.smith@example.com',
	// 		phone: '987-654-3210',
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Jane Smith',
	// 		age: 28,
	// 		gender: 'Female',
	// 		occupation: 'Designer',
	// 		city: 'Los Angeles',
	// 		country: 'USA',
	// 		email: 'jane.smith@example.com',
	// 		phone: '987-654-3210',
	// 	},
	// ];

	return (
		<>
			<CustomModalDetail
				detailData={detailData}
				actions={{ update: updateEmployee }}
				hiddenFields={[]}
			/>
			<CardHeader pageCount={pageCount} paginateFunction={paginate} />
			<div className="card-body">
				<CustomTable data={employeeList} hiddenFields={['id']} />
			</div>
		</>
	);
}

export default EmployeeList;
