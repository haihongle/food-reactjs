import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import accountServices from '../../../../services/employeServices/AccountServices';
import Toast from '../../../../components/toast-message/ToastMessage';
import { useNavigate } from 'react-router';

const CreateAccountSchema = Yup.object().shape({
	fullName: Yup.string().required('Please enter full name'),
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

function CreateUser() {
	const navigate = useNavigate();

	const createAccount = async (data) => {
		try {
			const response = await accountServices.createAccount(data);
			if (response.success) {
				Toast.success(response.message);
				navigate('/cms/employees/employee-list');
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<div className="card-body">
			<div className="col-md-5 m-auto border border-1 p-4 rounded-4">
				<h3 className="text-center">Create user</h3>
				<hr></hr>
				<Formik
					initialValues={{
						fullName: '',
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
							<div className="row g-3">
								<div className="col-md-6">
									<label className="w-100" htmlFor="fullName">
										<p className="fw-semibold">Full name</p>
									</label>
									<Field
										className="form-control mt-1 shadow-none p-2"
										name="fullName"
										type="text"
										onChange={handleChange}
										placeholder="Enter full name..."
									/>
									{errors.fullName && touched.fullName ? (
										<span className="form-warning text-danger fw-medium">*{errors.fullName}</span>
									) : null}
								</div>
								<div className="col-md-6">
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
										<option value="KITCHEN" label="Kitchen" />
										<option value="ACCOUNTANT" label="Accountant" />
										<option value="SALE" label="Sale Executive" />
										<option value="MARKETING" label="Marketing" />
										<option value="SHIPPER" label="Shipper" />
										<option value="MANAGER" label="Manager" />
									</Field>
									{errors.role && touched.role ? (
										<div className="form-warning text-danger fw-medium">* {errors.role}</div>
									) : null}
								</div>
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
								<div className="col-12">
									<label htmlFor="description">
										<p className="fw-semibold">Description</p>
									</label>
									<Field
										as="textarea"
										className="form-control mt-1 shadow-none p-2"
										name="description"
									/>
								</div>
							</div>

							<button className="btn btn-primary mt-4 w-100 p-2 fw-semibold" type="submit">
								Create
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default CreateUser;
