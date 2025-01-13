import { Outlet, useOutletContext } from 'react-router';

function EmployeeLayout() {
	const data = useOutletContext();
	return (
		<div>
			<Outlet context={{ data }}></Outlet>
		</div>
	);
}

export default EmployeeLayout;
