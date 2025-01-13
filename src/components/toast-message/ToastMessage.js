import { toast } from 'react-toastify';

const info = (message) => {
	toast.info(
		<div>
			<div>{message}</div>
		</div>,
		{
			autoClose: 2000,
		}
	);
};

const success = (message) => {
	toast.success(
		<div>
			<b style={{ fontSize: '1.2rem' }}>Success</b>
			<div>{message}</div>
		</div>,
		{
			autoClose: 2000,
		}
	);
};

const warning = (message) => {
	toast.warn(
		<div>
			<b style={{ fontSize: '1.2rem' }}>Warning</b>
			<div>{message}</div>
		</div>,
		{
			autoClose: 5000,
		}
	);
};

const error = (message) => {
	toast.error(
		<div>
			<b style={{ fontSize: '1.2rem' }}>Error</b>
			<div>{message}</div>
		</div>,
		{
			autoClose: 5000,
		}
	);
};

const Toast = { success, warning, error, info };

export default Toast;
