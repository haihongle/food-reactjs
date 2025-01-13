import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

function ClientLayout() {
	return (
		<>
			<header>
				<ul className="nav">
					<li className="nav-item">
						<Link className="nav-link" to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="authen">
							Authen
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="cart">
							Cart
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/cms">
							CMS
						</Link>
					</li>
				</ul>
			</header>
			<main>
				<Outlet></Outlet>
			</main>
			<footer>FOOTER</footer>
		</>
	);
}

export default ClientLayout;
