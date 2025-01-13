import { useLocation } from 'react-router';
import styles from './BreadCrumbs.module.scss';

function BreadCrumbs() {
	const { pathname } = useLocation();
	const crumbs = pathname
		.split('/')
		.filter(Boolean)
		.map((crumb, index) => (
			<div className={styles.crumb} key={index}>
				{crumb.toLowerCase() === 'cms'
					? 'CMS'
					: crumb.replace(/-/g, ' ').charAt(0).toUpperCase() + crumb.slice(1).replace(/-/g, ' ')}
			</div>
		));

	const workspace = crumbs[1]?.props.children || '';

	return (
		<>
			<div>
				<h3 className="fw-semibold">{workspace} Workspace</h3>
				<div className="d-flex align-items-center">{crumbs}</div>
			</div>
		</>
	);
}

export default BreadCrumbs;
