import Table from '../../../../components/custom-table/CustomTable';
import salaryServices from '../../../../services/employeServices/SalaryServices';
import Toast from '../../../../components/toast-message/ToastMessage';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

function Salary() {
	const [salaryData, setSalaryData] = useState(null);
	const { data: { filteredData } = {} } = useOutletContext() || {};

	const fetchSalaryList = async () => {
		try {
			const response = await salaryServices.getSalaryList();
			if (response.success) {
				setSalaryData(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchSalaryList();
	}, [filteredData]);

	return (
		<>
			<h2>Salary list</h2>
			<Table data={salaryData} />
		</>
	);
}

export default Salary;
