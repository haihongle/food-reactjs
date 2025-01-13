import ScrollToTop from 'react-scroll-to-top';
import styles from './ScrollTop.module.scss';

function ScrollTop() {
	return (
		<ScrollToTop
			smooth
			className={`${styles['scroll-to-top']}`}
			component={<span className={`${styles['arrow-up']}`}>&#8593;</span>}
		/>
	);
}

export default ScrollTop;
