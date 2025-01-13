import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import accountServices from '../../../../services/managerServices/AccountServices';
import Toast from '../../../../components/toast-message/ToastMessage';
import { useNavigate } from 'react-router';

const CreateAccountSchema = Yup.object().shape({
	fullname: Yup.string().required('Please enter full name'),
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters!')
		.max(50, 'Too Long!')
		.required('Please enter username'),
	password: Yup.string()
		.required('Please enter password')
		.matches(
			/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
			'Must Contain at least 6 Characters, One Uppercase and One Special Case Character'
		),
	email: Yup.string().email('Invalid email').required('Please enter email'),
	phone: Yup.string()
		.matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number')
		.required('Please enter phone number'),
	role: Yup.string().required('Please select role'),
	description: Yup.string(),
});

function Account() {
	const navigate = useNavigate();
	const createAccount = async (data) => {
		try {
			const response = await accountServices.createAccount(data);
			if (response.success) {
				Toast.success(response.message);
				navigate('/employee');
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};
	return (
		<div className="col-md-5 m-auto border border-1 p-4">
			<h3 className="text-center">Create user</h3>
			<hr></hr>
			<Formik
				initialValues={{
					fullname: '',
					username: '',
					password: '',
					email: '',
					phone: '',
					role: '',
					description: '',
				}}
				validationSchema={CreateAccountSchema}
				onSubmit={createAccount}
			>
				{({ errors, touched, handleChange }) => (
					<Form>
						<div className="mt-4 row">
							<div className="col-md-6">
								<label className="w-100" htmlFor="fullname">
									<p className="fw-semibold">First name</p>
								</label>
								<Field
									className="form-control mt-1 shadow-none p-2"
									name="fullname"
									type="text"
									onChange={handleChange}
									placeholder="Enter full name..."
								/>
								{errors.fullname && touched.fullname ? (
									<span className="form-warning text-danger fw-medium">*{errors.fullname}</span>
								) : null}
							</div>
							<div className="col-md-6 mt-md-0 mt-4">
								<label htmlFor="username">
									<p className="fw-semibold">Username</p>
								</label>
								<Field
									className="form-control mt-1 shadow-none p-2"
									name="username"
									type="text"
									onChange={handleChange}
									placeholder="Enter password..."
								/>
								{errors.username && touched.username ? (
									<div className="form-warning text-danger fw-medium">* {errors.username}</div>
								) : null}
							</div>
						</div>
						<div className="mt-3 row">
							<div className="col-md-6">
								<label htmlFor="password">
									<p className="fw-semibold">Password</p>
								</label>
								<Field
									className="form-control mt-1 shadow-none p-2"
									name="password"
									type="password"
									onChange={handleChange}
									placeholder="Enter password..."
									autoComplete="off"
								/>
								{errors.password && touched.password ? (
									<div className="form-warning text-danger fw-medium">* {errors.password}</div>
								) : null}
							</div>
							<div className="col-md-6">
								<label htmlFor="role">
									<p className="fw-semibold">Role</p>
								</label>
								<Field
									as="select"
									className="form-select mt-1 shadow-none p-2 selectarrow"
									name="role"
									onChange={handleChange}
								>
									<option value="" label="Select role..." />
									<option value="kitchen" label="Kitchen" />
									<option value="accountant" label="Accountant" />
									<option value="host" label="Host" />
									<option value="marketing" label="Marketing" />
									<option value="shipper" label="Shipper" />
									<option value="leader" label="Leader" />
								</Field>
								{errors.role && touched.role ? (
									<div className="form-warning text-danger fw-medium">* {errors.role}</div>
								) : null}
							</div>
						</div>
						<div className="mt-3 row">
							<div className="col-md-6">
								<label htmlFor="email">
									<p className="fw-semibold">Email</p>
								</label>
								<Field
									className="form-control mt-1 shadow-none p-2"
									name="email"
									type="email"
									onChange={handleChange}
									placeholder="Enter email..."
								/>
								{errors.email && touched.email ? (
									<div className="form-warning text-danger fw-medium">* {errors.email}</div>
								) : null}
							</div>
							<div className="col-md-6">
								<label htmlFor="phone">
									<p className="fw-semibold">Phone number</p>
								</label>
								<Field
									className="form-control mt-1 shadow-none p-2"
									name="phone"
									type="text"
									onChange={handleChange}
									placeholder="Enter phone number..."
								/>
								{errors.phone && touched.phone ? (
									<div className="form-warning text-danger fw-medium">* {errors.phone}</div>
								) : null}
							</div>
						</div>
						<div className="mt-4">
							<label htmlFor="description">
								<p className="fw-semibold">Description</p>
							</label>
							<Field
								as="textarea"
								className="form-control mt-1 shadow-none p-2"
								name="description"
							/>
						</div>
						<button className="btn btn-primary mt-4 w-100 p-2 fw-semibold" type="submit">
							Create
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Account;
