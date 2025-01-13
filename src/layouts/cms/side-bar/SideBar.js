import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import sidebar from '../../../config/SideBar.config';
import styles from './SideBar.module.scss';

const SideBarItem = memo(({ item, isActive, onClick }) => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const userRole = storedUser ? storedUser.role : null;
	const hasAccess = item.roles.some((role) => role === userRole) || userRole === 'BOSS' ;
	const location = useLocation();
	const isItemActive =
		isActive === item.path || location.pathname.split('/').pop() === item.path.split('/').pop();
	const isChildActive = item.children_item?.some(
		(child) => location.pathname.split('/').pop() === child.path.split('/').pop()
	);

	return (
		<div className="background-workspace border-0 pt-1 pb-1">
			{hasAccess && item.has_children ? (
				<>
					<div
						className={`cms_animate-hover pt-2 pb-2 ${
							item.is_main ? 'ps-2' : item.icon === '+' ? 'ps-5' : 'ps-4'
						}`}
						data-bs-toggle="collapse"
						data-bs-target={`#${item.item_name}Accordion`}
					>
						<div className="row g-0">
							<div className="col-1">{item.icon}</div>
							<div className="col-9">
								{item.is_main ? (
									<h5 className="ps-2">{item.item_name}</h5>
								) : (
									<span>{item.item_name}</span>
								)}
							</div>
							<div className="col-2">
								<i className="fa-solid fa-caret-right" style={{ marginTop: '13%' }}></i>
							</div>
						</div>
					</div>
					<div
						className={`accordion-collapse collapse ${isChildActive ? 'show' : ''}`}
						id={`${item.item_name}Accordion`}
						data-bs-parent={item.is_main ? '#mainAccordion' : undefined}
					>
						{item.children_item.map((child, index) => (
							<SideBarItem key={index} item={child} isActive={isActive} onClick={onClick} />
						))}
					</div>
				</>
			) : hasAccess ? (
				<Link
					className={`${styles['hover-site']} ${isItemActive ? styles.activeSite : ''}`}
					to={item.path}
					onClick={() => onClick(item.path)}
				>
					<div
						className={`pt-2 pb-2 accordion-item background-workspace row g-0 rounded-0 border-0 ${
							item.icon === '+' ? 'ps-5' : 'ps-4'
						}`}
					>
						<div className="col-1">{item.icon}</div>
						<div className="col-9">{item.item_name}</div>
						<div className="col-2"></div>
					</div>
				</Link>
			) : null}
		</div>
	);
});

const SideBar = () => {
	const [active, setActive] = useState(null);

	const handleActive = (path) => {
		setActive(path);
	};

	return (
		<>
			<div className="header-height d-flex justify-content-center">
				<div className="w-100 align-self-center text-center">
					<Link to={'/cms/home'}>
						<span className={`${styles['sidebar-home']} text-light fs-3 fw-bold user-select-none`}>
							HAPPY FOOD
						</span>
					</Link>
				</div>
			</div>
			<div className="accordion mt-2" id="mainAccordion">
				{sidebar.map((item, index) => (
					<SideBarItem key={index} item={item} isActive={active} onClick={handleActive} />
				))}
			</div>
		</>
	);
};

export default memo(SideBar);
