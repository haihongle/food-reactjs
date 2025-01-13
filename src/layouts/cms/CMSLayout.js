import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './CMSLayout.module.scss';
import SideBar from './side-bar/SideBar';
import BreadCrumbs from '../../components/breadcrumb/BreadCrumbs';
import Toast from '../../components/toast-message/ToastMessage';
import Input from '../../components/custom-input/CustomInput';
import filters from '../../config/Filter.config';

const SettingModal = () => (
	<div className="modal fade" id="settingModal" data-bs-backdrop="static">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h2>Setting</h2>
				</div>
				<div className="modal-body"></div>
				<div className="modal-footer">
					<button className="btn btn-danger" data-bs-dismiss="modal">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
);

const Header = ({ toggleSideBar, user, logOut, hours, minutes, seconds, ampm }) => (
	<header className={`${styles['header-workspace']} header-height container-fluid p-2 p-md-4`}>
		<div className="d-flex justify-content-between h-100">
			<div className="d-flex align-items-center col-md-4">
				<button className="btn btn-primary-circle me-3" onClick={toggleSideBar}>
					<i className="fa-solid fa-list"></i>
				</button>
				<input className="form-control rounded-5" placeholder="Search..." />
			</div>
			<div className="d-flex align-items-center user-select-none">
				<div className="d-flex align-items-center me-md-4 me-2 user-select-none">
					<button className="btn-primary-circle me-2">
						<i className="fa-solid fa-clock"></i>
					</button>
					<h5 className="text-light">
						{hours}:{minutes}:{seconds} {ampm}
					</h5>
				</div>
				<a
					className={`${styles['header-item']} me-md-4 me-2 position-relative`}
					aria-expanded="false"
					data-bs-toggle="dropdown"
				>
					<div className="d-flex">
						<button className="btn-primary-circle">
							<i className="fa-solid fa-bell"></i>
						</button>
						<span className="d-none d-lg-inline-flex align-self-center ms-2 fs-5 text-light user-select-none">
							Notifications
						</span>
						<div className={`${styles['new-dot']}`}></div>
					</div>
				</a>
				<ul className="dropdown-menu user-select-none dropdown-height">
					<li className="dropdown-item"></li>
					<hr className="dropdown-divider" />
				</ul>
				<a className={`${styles['header-item']}`} aria-expanded="false" data-bs-toggle="dropdown">
					<div className="d-flex">
						<div className="user-avatar">
						<img 
							src={`/user-avatars/${user?.username || 'admin'}.png`} 
							alt={user?.username ? `${user.username} avatar` : 'Default avatar'} 
							onError={(e) => {
								e.target.onerror = null; // Ngăn lỗi lặp vô hạn
								e.target.src = "/user-avatars/admin.png"; // Đường dẫn tới ảnh mặc định
							}} 
						/>
						</div>
						<span className="d-none d-lg-inline-flex align-self-center ms-2 fs-5 text-light user-select-none">
							{user?.username || null}
						</span>
					</div>
				</a>
				<ul className="dropdown-menu user-select-none dropdown-height">
					<li className="dropdown-header pt-0 pb-0 fs-5">Menu</li>
					<hr className="dropdown-divider" />
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
					<li className="dropdown-item cms_animate-hover" onClick={logOut}>
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
);

const FilterSection = ({ filterData }) => {
	const location = useLocation().pathname.split('/').pop();

	return (
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
							<i className="fa-solid fa-magnifying-glass me-1"></i> Find
						</button>
						<button className="btn btn-sm btn-primary cms-hover">
							<i className="fa-solid fa-rotate-left me-1"></i> Reset filter
						</button>
					</div>
				</div>
				{filters &&
					filters.map((filter, index) =>
						filter.name === location ? (
							<div className="card-body" key={index}>
								<div className="row">
									<div>
										<form className="row g-4" id="filterForm" onSubmit={filterData}>
											<input type="hidden" name="filter" value={filter.name} />
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
	);
};

function CMSLayout() {
	const [, , removeCookie] = useCookies(['token']);
	const [filteredData, setFilteredData] = useState(null);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (date) => {
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const ampm = hours >= 12 ? 'PM' : 'AM';

		hours = hours % 12 || 12;

		return {
			hours: hours < 10 ? `0${hours}` : hours,
			minutes: minutes < 10 ? `0${minutes}` : minutes,
			seconds: seconds < 10 ? `0${seconds}` : seconds,
			ampm,
		};
	};
	const time = formatTime(currentTime);

	const logOut = () => {
		removeCookie('token', { path: '/' });
		localStorage.clear();
		navigate('/cms/login');
		Toast.info('Logout successfully');
	};

	const filterData = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formObject = Object.fromEntries(formData.entries());
		setFilteredData(formObject);
	};

	const toggleSideBar = () => {
		setSidebarVisible((prevVisible) => !prevVisible);
	};

	return (
		<>
			<SettingModal />
			<div className="container-fluid position-relative d-flex p-0">
				<div className={`${styles['sidebar']} ${sidebarVisible ? styles.open : ''}`}>
					<SideBar />
				</div>
				<div className={`${styles['content']} ${sidebarVisible ? styles.open : ''}`}>
					<Header
						toggleSideBar={toggleSideBar}
						user={user}
						logOut={logOut}
						hours={time.hours}
						minutes={time.minutes}
						seconds={time.seconds}
						ampm={time.ampm}
					/>
					<div className={`${styles['body-workspace']} container-md-fluid ps-0 pe-0 p-md-4`}>
						<div className="d-flex justify-content-between">
							<BreadCrumbs />
							<div className="d-flex align-items-center justify-content-end">
								<div className="me-3 d-flex">
									<button className="btn rounded-end-0 btn-primary">
										<i className="fa-solid fa-magnifying-glass"></i>
									</button>
									<input className="form-control rounded-start-0" />
								</div>
								<button
									className="btn btn-primary"
									data-bs-toggle="collapse"
									data-bs-target="#filterCollapse"
								>
									<i className="fa-solid fa-filter me-2"></i> Filter
								</button>
							</div>
						</div>
						<FilterSection filterData={filterData} />
						<div className={`card pt-2 pb-2 ${styles['card-bg']}`}>
							<Outlet context={{ filteredData }} />
						</div>
					</div>
					<div className="container-fluid p-0 pt-md-4 ps-md-4 pe-md-4 pb-md-2">
						<footer className={`${styles['footer-workspace']} p-3 rounded text-center`}>
							@ 2024 - Happy Food. All right reserved
						</footer>
					</div>
				</div>
			</div>
		</>
	);
}

export default CMSLayout;
