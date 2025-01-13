import React, { useState, useMemo, useEffect } from 'react';
import styles from './Home.module.scss';
import menuServices from '../../../services/menuServices/MenuServices';
import Toast from '../../../components/toast-message/ToastMessage';
import { useOutletContext } from 'react-router-dom';

function Home() {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [priceRange, setPriceRange] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const { updateCartCount } = useOutletContext();

	const images = [
		{ image: '/images/pizza.jpg' },
		{ image: '/images/burger.jpg' },
		{ image: '/images/sushi.jpg' },
		{ image: '/images/cake.jpg' },
		{ image: '/images/kfc.jpg' },
		{ image: '/images/bread.jpg' },
		{ image: '/images/rice.jpg' },
		{ image: '/images/donut.jpg' },
		{ image: '/images/banhbao.jpg' },
		{  image: '/images/trungchien.jpg' },
		{  image: '/images/thitkhotau.jpg' },
	];

	const imagebody = [
		'/images/pizza.jpg',
		'/images/kfc.jpg',
		'/images/burger.jpg',
		'/images/banhbao.jpg',
	];

	const itemsPerPage = 7;

	const [menus, setMenus] = useState([]);
	const getMenu = async (page) => {
		console.log(menus);
		try {
			const isActive = true;
			const response = await menuServices.getList(page, isActive);
			if (response.success) {
				// Toast.success(response.message);
				setMenus(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	// ảnh 3 giây đổi
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagebody.length);
		}, 3000);

		return () => clearInterval(intervalId);
	}, []);

	const totalPages = Math.ceil(menus.length / itemsPerPage);

	//lọc sản phẩm
	const filteredMenus = useMemo(() => {
		return menus.filter((menu) => {
			const categoryMatch = selectedCategory ? menu.category === selectedCategory : true;
			const priceMatch = priceRange
				? menu.price >= priceRange[0] && menu.price <= priceRange[1]
				: true;
			const searchMatch = menu.name.toLowerCase().includes(searchQuery.toLowerCase()); // Search query match

			return categoryMatch && priceMatch && searchMatch;
		});
	}, [menus, selectedCategory, priceRange, searchQuery]);

	// phân trang
	const paginatedMenus = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredMenus.slice(startIndex, endIndex);
	}, [filteredMenus, currentPage]);

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	//xử lý Order
	const handleOrder = (menu) => {
		let order = JSON.parse(localStorage.getItem('order')) || [];
		const existingItem = order.find((item) => item.id === menu.id);

		if (!existingItem) {
			// Thêm sản phẩm mới nếu không tồn tại
			order.push({ ...menu, quantity: 1 });
			Toast.success(`${menu.name} added to cart.`);
		} else {
			Toast.info(`${menu.name} is already in the cart.`);
		}
		localStorage.setItem('order', JSON.stringify(order));
		updateCartCount();
		console.log(JSON.stringify(order));
	};

	// danh mục
	const categories = [...new Set(menus.map((menu) => menu.category))];

	// chọn giá
	const priceRanges = [
		{ label: 'Dưới 50k', value: [0, 50000] },
		{ label: '50k - 100k', value: [50000, 100000] },
		{ label: 'Trên 100k', value: [100000, Infinity] },
	];

	return (
		<>
			{/* Main Content Section */}
			<main className={styles.mainContent}>
				<div className={styles.leftSection}>
					<h2>Healthy & Quality</h2>
					<h1>Delicious Food Menu</h1>
				</div>
				<div className={styles.rightSection}>
					<img
						src={`${process.env.PUBLIC_URL}${imagebody[currentImageIndex]}`}
						alt="Food"
						className={styles.foodImage}
					/>
				</div>
				<div className={styles.offerCircle}>
					<p>
						Up to
						<br />
						Save
						<br />
						50% off !
					</p>
				</div>
			</main>

			<div className={styles.menuContent}>Our Menu</div>
			<div className="container">
				<div className="row g-5">
					<div className="col-md-4">
						<h3 className="mb-2">Search</h3>
						<input
							type="text"
							placeholder="Search menu..."
							value={searchQuery}
							className="form-control"
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="col-md-4">
						<h3 className="mb-2">Category</h3>
						<select
							className="form-select"
							onChange={(e) => setSelectedCategory(e.target.value)}
							value={selectedCategory}
						>
							<option value="">Tất cả</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-4">
						<h3 className="mb-2">Price Range</h3>
						<div className="d-flex">
							{priceRanges.map((range) => (
								<div key={range.label} className="form-check">
									<input
										type="radio"
										name="priceRange"
										id={range.label}
										value={range.label}
										onChange={() => setPriceRange(range.value)}
									/>
									<label htmlFor={range.label}>{range.label}</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Product Cards Section */}
			<div className={styles.productCards}>
				{paginatedMenus.map((menu, index) => (
					<div key={menu.name} className={styles.card}>
						{menu.image == null || menu.image == undefined ? (
							<img src={images[index < images.length ? index : 1].image} />
						) : (
							<img src={menu.image} />
						)}
						<h3>{menu.name}</h3>
						<span>
							Category: <strong>{menu.category}</strong>
						</span>
						<p className={styles.price}>Price {menu.price.toFixed(3)} VNĐ</p>
						<button className={styles.orderBtn} onClick={() => handleOrder(menu)}>
							Order Now
						</button>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className={styles.pagination}>
				<button onClick={goToPreviousPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button onClick={goToNextPage} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</>
	);
}

export default Home;
