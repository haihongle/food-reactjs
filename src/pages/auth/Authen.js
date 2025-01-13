import authenServices from '../../services/userServices/AuthenServices';
import { useState } from 'react';
import Toast from '../../components/toast-message/ToastMessage';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function Authen() {
	const [loginError, setLoginError] = useState(null);
	const [cookies, setCookie] = useCookies(['token']);
	const navigate = useNavigate();

	const submitLogin = async (e) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			password: e.target.password.value,
		};

		try {
			const response = await authenServices.login(data);
			if (response.success) {
				Toast.success(response.message);
				setCookie('token', response.data.token);
				const decodedToken = jwtDecode(response.data.token);
				localStorage.setItem('user', JSON.stringify(decodedToken));
				navigate('/');
			} else {
				setLoginError(true);
			}
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return (
		<div className="p-1 p-md-0 mt-2 mb-2">
			<div className="col-md-3 p-5 m-auto border border-1">
				<h3 className="text-center mb-4">LOGIN</h3>
				<form onSubmit={submitLogin}>
					<label className="mb-2 fw-bold">Username or Email</label>
					<input
						type="text"
						name="username"
						className="form-control"
						placeholder="Enter username or email.."
						required
					/>
					<label className="mt-4 mb-2 fw-bold">Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						placeholder="Enter password.."
						required
					/>
					{loginError && (
						<p className="text-danger mt-3 text-center fw-semibold">
							Incorrect username or password
						</p>
					)}
					<button className="btn btn-primary fw-bold mt-4 w-100" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Authen;
