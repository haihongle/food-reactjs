import style from './Loading.module.scss';

function LoadingSpiner() {
	return (
		<div className={style['lds-body']}>
			<div className={style['lds-spinner']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default LoadingSpiner;
