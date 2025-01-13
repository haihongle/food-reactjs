import routes from './config/Routes.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollTop from './components/scroll-top/ScrollTop';

function App() {
	return (
		<div className="App">
			<ToastContainer className="toast-position" />
			<ScrollTop />
			{routes}
		</div>
	);
}

export default App;
