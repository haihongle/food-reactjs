import { Outlet, Navigate } from 'react-router';
import { useCookies } from 'react-cookie';

const PrivateRoute = () => {
	const [cookies] = useCookies(['token']);
	const token = cookies.token;
	return token ? <Outlet /> : <Navigate to="/cms/login" />;
};

export default PrivateRoute;
