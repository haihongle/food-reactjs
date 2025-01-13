import styles from './NotFound.module.scss';

function NotFound() {
	return (
		<>
			<div className={styles.notfoundwrapper}>
				<h1 className={styles.ghost}>
					4
					<span>
						<i className="fas fa-ghost"></i>
					</span>
					4
				</h1>
				<h2 className={styles.pagenotfound}>Error: 404 page not found</h2>
				<p className={styles.pagenotfound}>Sorry, the page you're looking for cannot be accessed</p>
				<a className="btn btn-primary mt-3 fs-4" href="/cms/home">
					Back to home
				</a>
			</div>
		</>
	);
}

export default NotFound;
