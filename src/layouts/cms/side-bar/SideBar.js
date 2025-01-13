import React from 'react';
import { Link } from 'react-router-dom';
import sidebar from '../../../config/SideBar.config';

const Sidebar = React.memo(({ item }) => (
	<>
		<div className="background-workspace border-0">
			{item.has_children ? (
				<div
					className={`cms_animate-hover pt-2 pb-2 ${item.is_main ? 'ps-2' : item.icon === '+' ? 'ps-5' : 'ps-4'}`}
					data-bs-toggle="collapse"
					data-bs-target={`#${item.item_name}Arrcordion`}
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
							{item.has_children ? (
								<i className="fa-solid fa-caret-right" style={{ marginTop: '13%' }}></i>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			) : (
				<Link to={item.path}>
					<div
						className={`cms_animate-hover pt-2 pb-2 accordion-item background-workspace row g-0 rounded-0 border-0 ${item.icon === '+' ? 'ps-5' : 'ps-4'}`}
					>
						<div className="col-1">{item.icon}</div>
						<div className="col-9">{item.item_name}</div>
						<div className="col-2"></div>
					</div>
				</Link>
			)}
		</div>
		{item.has_children && (
			<div
				className="accordion-collapse collapse"
				id={`${item.item_name}Arrcordion`}
				data-bs-parent={item.is_main ? '#mainAccordion' : null}
			>
				{item.children_item.map((child, index) => (
					<Sidebar key={index} item={child} />
				))}
			</div>
		)}
	</>
));

function SideBar() {
	return (
		<div>
			<div className="header-height d-flex justify-content-center">
				<div className="w-100 align-self-center text-center">
					<Link to={'/cms'}>
						<span className="text-light fs-3 fw-bold user-select-none">HAPPY FOOD</span>
					</Link>
				</div>
			</div>
			<div className="border border-light"></div>
			<div className="accordion mt-2" id="mainAccordion">
				{sidebar.map((item, index) => (
					<Sidebar key={index} item={item} />
				))}
			</div>
		</div>
	);
}

export default SideBar;
