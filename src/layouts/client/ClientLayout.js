import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './ClientLayout.module.scss';

function ClientLayout() {
	const [cartCount, setCartCount] = useState(0);

	// Hàm để tính số lượng sản phẩm trong giỏ hàng từ localStorage
	const updateCartCount = () => {
		const order = JSON.parse(localStorage.getItem('order')) || [];
		const count = order.reduce((total, item) => total + item.quantity, 0);
		setCartCount(count);
	};

	useEffect(() => {
		updateCartCount(); // Cập nhật khi component được render

		// Lắng nghe thay đổi trên `localStorage` nếu bạn muốn cập nhật realtime
		window.addEventListener('storage', updateCartCount);
		return () => window.removeEventListener('storage', updateCartCount);
	}, []);
	return (
		<>
			<header className={styles.header}>
				<Link to="/" className={styles.logoLink}>
					<img src="/logo.png" alt="Logo" className={styles.logo}></img>{' '}
				</Link>
				<nav className={styles.navMenu}>
					<ul>
						<li>
							<Link to="/">
								<i className="fas fa-home"></i> Home
							</Link>
						</li>
						<li>
							<Link to="cart">
								<i className="fas fa-shopping-cart"></i> Cart
								{cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
							</Link>
						</li>
				
					</ul>
				</nav>
			</header>
			<main>
				<Outlet context={{ updateCartCount }} />
			</main>
			<footer className={styles.footer}>
				<div className={styles.footerContent}>
					<div className={styles.footerLeft}>
						<h3>@e-project 2</h3>
						<p>&copy; 2024 Food Store. All Rights Reserved.</p>
					</div>
					<div className={styles.footerCenter}>
						<h4>Links</h4>
						<ul>
							<li>
								<Link to="/">
									<i className="fas fa-home"></i> Home
								</Link>
							</li>
							<li>
								<Link to="/about">
									<i className="fas fa-info-circle"></i> About Us
								</Link>
							</li>
							<li>
								<Link to="cart">
									<i className="fas fa-shopping-cart"></i> Cart
								</Link>
							</li>
							<li>
								<Link to="/cms/home">
									<i className="fas fa-user"></i> Login
								</Link>
							</li>
							<li>
								<Link to="/pages/cms/orders/cancel-orders/CancelOrders">
									<i className="fas fa-blog"></i> Blog
								</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footerRight}>
						<h4>Follow Us</h4>
						<div className={styles.socialIcons}>
							<a href="#">
								<i className="fab fa-facebook-f"></i>
							</a>
							<a href="#">
								<i className="fab fa-twitter"></i>
							</a>
							<a href="#">
								<i className="fab fa-instagram"></i>
							</a>
							<a href="#">
								<i className="fab fa-linkedin-in"></i>
							</a>
						</div>
					</div>
					<div className={styles.footerAddress}>
						<h4>Address</h4>
						<a
							href="https://www.google.com/maps/place/Detech+Building/@21.028765,105.781789,14z/data=!4m6!3m5!1s0x313454b3285df81f:0x97be82a66bbe646b!8m2!3d21.0287649!4d105.7817893!16s%2Fg%2F11b7sy4x6v?hl=vi&entry=ttu"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.addressLink}
						>
							<i className="fa-solid fa-location-dot"></i> 8 Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm,
							Hà Nội, Việt Nam
						</a>
						<iframe
							className={styles.mapIframe}
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.164880305965!2d105.7816318452492!3d21.029387120259692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3285df81f%3A0x97be82a66bbe646b!2sDetech%20Building!5e0!3m2!1svi!2s!4v1713486964354!5m2!1svi!2s"
							width="100%"
							height="250"
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</footer>
		</>
	);
}

export default ClientLayout;
