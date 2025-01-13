import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { routes, notfoundRoute } from './config/Routes.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollTop from './components/scroll-top/ScrollTop';
import Loading from './components/loading-spinner/Loading';
import { useCookies } from 'react-cookie';
import { useEffect, useMemo, Suspense } from 'react';
import Toast from './components/toast-message/ToastMessage';
import Home from './pages/client/home/home';
import Cart from './pages/client/cart/Cart';

function App() {
	const [cookies] = useCookies(['token']);
	const navigate = useNavigate();
	const location = useLocation();
	const token = useMemo(() => cookies.token, [cookies]);

	// useEffect(() => {
	// 	if (!token && location.pathname !== '/authen') {
	// 		navigate('/authen');
	// 		Toast.info('Login to continue!');
	// 	}
	// }, [token, location.pathname, navigate]);

	return (
		<div className="App">
			<Suspense fallback={<Loading />}>
				<ToastContainer className="toast-position" />
				<ScrollTop />
				<Routes>
					 <Route path="/" element={<Home />} />
					 <Route path="/cart" element={<Cart/>} />
					{routes}
					{notfoundRoute}
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
