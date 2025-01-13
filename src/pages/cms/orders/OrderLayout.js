import { Outlet } from 'react-router';
import { useOutletContext } from 'react-router-dom';

function OrderLayout() {
	const { filteredData } = useOutletContext();
	return (
		<div>
			<Outlet context={{ filteredData }}></Outlet>
		</div>
	);
}

export default OrderLayout;
