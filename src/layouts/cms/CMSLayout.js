import { Outlet, useNavigate, useLocation } from 'react-router';
import SideBar from './side-bar/SideBar';
import styles from './CMSLayout.module.scss';
import BreadCrumbs from '../../components/breadcrumb/BreadCrumbs';
import { useCookies } from 'react-cookie';
import Toast from '../../components/toast-message/ToastMessage';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/custom-input/custom-input';
import filters from '../../config/Filter.config';

function CMSLayout() {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const [toggle, setToggle] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const location = useLocation().pathname.split('/').pop();

	const logOut = () => {
		removeCookie('token');
		Toast.info('Logout successfully');
		localStorage.clear();
		navigate('/authen');
	};

	const filterData = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formObject = Object.fromEntries(formData.entries());
		console.log(formObject);
	};

	const toggleSideBar = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<div className="modal fade" id="settingModal" data-bs-backdrop="static">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h2>Setting</h2>
						</div>
						<div className="modal-body"></div>
						<div className="modal-footer">
							<button className="btn btn-danger" data-bs-dismiss="modal">
								close
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`background-workspace position-fixed ${toggle ? 'slide-out' : 'slide-in col-2'}`}
				style={{ minHeight: '100vh' }}
			>
				<SideBar />
			</div>
			<div className="row g-0">
				<div className={toggle ? '' : 'col-2'}></div>
				<div className={toggle ? 'col-12' : 'col'}>
					<header className={`${styles['header-workspace']} header-height`}>
						<div className="d-flex justify-content-between h-100 fs-5">
							<div className="d-flex align-items-center">
								<button className="btn cms_animate-hover" onClick={() => toggleSideBar()}>
									<i className="fa-solid fa-list me-2"></i>
									Menu
								</button>
							</div>
							
							<div className="d-flex align-items-center">
								<div className="user-avatar me-2">
									<img src={`/user-avatars/.png`} />
								</div>
								<button className="btn cms_animate-hover me-1" data-bs-toggle="dropdown">
									<i className="fa-solid fa-bell"></i>
								</button>
								<ul className="dropdown-menu user-select-none dropdown-height">
									<li className="dropdown-header fs-5 border-bottom pt-0 pb-1">Notifications</li>
								</ul>
								<button className="btn cms_animate-hover me-1" data-bs-toggle="dropdown">
									<i className="fa-solid fa-envelope"></i>
								</button>
								<ul className="dropdown-menu user-select-none dropdown-height">
									<li className="dropdown-header fs-5 border-bottom pt-0 pb-1">Messages</li>
								</ul>
								<button className="btn cms_animate-hover" data-bs-toggle="dropdown">
									<i className="fa-solid fa-bars"></i>
								</button>
								<ul className="dropdown-menu user-select-none dropdown-height">
									<li className="dropdown-header fs-5 border-bottom pt-0 pb-1"></li>
									<li className="dropdown-item cms_animate-hover">
										<Link to={'/'}>
											<div className="row">
												<div className="col-1">
													<i className="fa-solid fa-house"></i>
												</div>
												<div className="col ps-3">Home</div>
											</div>
										</Link>
									</li>
									<li
										className="dropdown-item cms_animate-hover"
										data-bs-target="#settingModal"
										data-bs-toggle="modal"
									>
										<div className="row">
											<div className="col-1">
												<i className="fa-solid fa-gear"></i>
											</div>
											<div className="col ps-3">Setting</div>
										</div>
									</li>
									<li className="dropdown-item cms_animate-hover" onClick={() => logOut()}>
										<div className="row">
											<div className="col-1">
												<i className="fa-solid fa-right-from-bracket"></i>
											</div>
											<div className="col ps-3">Log out</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</header>
					<div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
						<div className="container-fluid">
							<div className="d-flex justify-content-between pt-3">
								<BreadCrumbs />
								<div className="d-flex align-items-center justify-content-end">
									<div className="me-3 d-flex">
										<button className="btn rounded-end-0 btn-primary">
											<i className="fa-solid fa-magnifying-glass"></i>
										</button>
										<input className="form-control rounded-start-0"></input>
									</div>
									<button
										className="btn btn-primary"
										data-bs-toggle="collapse"
										data-bs-target="#filterCollapse"
									>
										<i className="fa-solid fa-filter me-2"></i>Filter
									</button>
								</div>
							</div>
							<div id="filterCollapse" className="accordion-collapse collapse">
								<div className="card">
									<div className="card-header d-flex justify-content-between">
										<h4 className="mb-0">Filter</h4>
										<div>
											<button
												className="btn btn-sm btn-primary cms-hover me-2"
												type="submit"
												form="filterForm"
											>
												<i className="fa-solid fa-magnifying-glass me-2"></i>Find
											</button>
											<button className="btn btn-sm btn-primary cms-hover">
												<i className="fa-solid fa-rotate-left me-2"></i>Reset filter
											</button>
										</div>
									</div>
									{filters &&
										filters.map((filter, index) =>
											filter.name === location ? (
												<div className="card-body" key={index}>
													<div className="row g-4">
														<div>
															<form className="row g-2" id="filterForm" onSubmit={filterData}>
																{filter.filter.map((item, zindex) => (
																	<Input
																		key={zindex}
																		type={item.type}
																		field={item.field}
																		options={item.options}
																	/>
																))}
															</form>
														</div>
													</div>
												</div>
											) : null
										)}
								</div>
							</div>
							<div className="pt-2 pb-2">
								<div className="card">
									<div className="card-body pt-5 pb-5">
										<Outlet></Outlet>
									</div>
								</div>
							</div>
						</div>
					</div>
					<footer className={`${styles['footer-workspace']} container-fluid pt-2 pb-2`}>
						@ 2024 - Happy Food. All right reserved
					</footer>
				</div>
			</div>
		</>
	);
}

export default CMSLayout;
