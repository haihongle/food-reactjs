import React, { useState, useEffect, useMemo } from 'react';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faBlog, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        { image: '/images/trungchien.jpg' },
        { image: '/images/thitkhotau.jpg' },
    
    ];

    const imagebody = [
        '/images/pizza.jpg',
        '/images/kfc.jpg',
        '/images/burger.jpg',
        '/images/banhbao.jpg'   
    ];

    const itemsPerPage = 6;  // Số sản phẩm trên mỗi trang

   
    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    
    const productsWithImages = useMemo(() => {
        return products.map((product, index) => ({
            ...product,
            image: images[index]?.image || '/images/default.jpg' 
        }));
    }, [products]);

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    useEffect(() => {
        setFilteredProducts(
            productsWithImages.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, productsWithImages]);

    // Thay đổi ảnh body sau mỗi 3 giây
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagebody.length); 
        }, 3000);

        return () => clearInterval(intervalId);
    }, [imagebody.length]);

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Lấy danh sách sản phẩm cho trang hiện tại
    const paginatedProducts = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * itemsPerPage, 
            currentPage * itemsPerPage
        );
    }, [filteredProducts, currentPage]);

    // Điều hướng trang
    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <Link to="/" className={styles.logoLink}>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className={styles.logo} />
                </Link>
                <nav className={styles.navMenu}>
                    <ul>
                        <li>
                            <Link to="/">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="cart">
                                <FontAwesomeIcon icon={faShoppingCart} /> Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="authen">
                                <FontAwesomeIcon icon={faUser} /> Login
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="#">
                                <FontAwesomeIcon icon={faBlog} /> Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <FontAwesomeIcon icon={faPhone} /> Contact Us
                            </Link>
                        </li> */}
                    </ul>
                </nav>
                <div className={styles.headerRight}>
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Enter food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <div className={styles.contactInfo}>
                        <p className="fas fa-phone">+0298.999.999</p>
                        <p>Contact us to order</p>
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <main className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <h2>Healthy & Quality</h2>
                    <h1>Delicious Food Menu</h1>
                    <button className={styles.orderNowBtn}>Order Now</button>
                </div>
                <div className={styles.rightSection}>
                    <img
                        src={`${process.env.PUBLIC_URL}${imagebody[currentImageIndex]}`} 
                        alt="Food"
                        className={styles.foodImage}
                    />
                </div>
                <div className={styles.offerCircle}>
                    <p>Up to<br />Save<br />50% off !</p>
                </div>
            </main>

            <div className={styles.menuContent}>Menu</div>

            {/* Product Cards Section */}
            <div className={styles.productCards}>
                {paginatedProducts.map(product => (
                    <div key={product.id} className={styles.card}>
                        <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Limited quantity: <strong>{product.quantity}</strong></p>
                        <p className={styles.price}>Only ${product.price}</p>
                        <button className={styles.orderBtn}>Order Now</button>
                    </div>
                ))}
            </div>
            
            {/* Pagination */}
            <div className={styles.pagination}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>

            {/* footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLeft}>
                        <h3>@e-project 2</h3>
                        <p>&copy; 2024 Food Store. All Rights Reserved.</p>
                    </div>
                    <div className={styles.footerCenter}>
                        <h4>Links</h4>
                        <ul>
                            <li><a href="#"><i class="fas fa-home"></i> Home</a></li>
                            <li><a href="#"><i class="fas fa-info-circle"></i> About Us</a></li>
                            <li><a href="#"><i class="fas fa-shopping-cart"></i> Cart</a></li>
                            <li><a href="#"><i class="fas fa-user"></i> Login</a></li>
                            <li><a href="#"><i class="fas fa-blog"></i> Blog</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerRight}>
                        <h4>Follow Us</h4>
                        <div class={styles.socialIcons}>
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className={styles.footerAddress}>
                        <h4>Address</h4>
                        <a href="https://www.google.com/maps/place/Detech+Building/@21.028765,105.781789,14z/data=!4m6!3m5!1s0x313454b3285df81f:0x97be82a66bbe646b!8m2!3d21.0287649!4d105.7817893!16s%2Fg%2F11b7sy4x6v?hl=vi&entry=ttu" target="_blank" class={styles.addressLink}>
                            <i className="fa-solid fa-location-dot"></i> 8 Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam
                        </a>
                        <iframe 
                            className={styles.mapIframe} 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.164880305965!2d105.7816318452492!3d21.029387120259692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3285df81f%3A0x97be82a66bbe646b!2sDetech%20Building!5e0!3m2!1svi!2s!4v1713486964354!5m2!1svi!2s"
                            width="100%" 
                            height="250" 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;