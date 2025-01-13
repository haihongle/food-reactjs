import { useState, useEffect } from 'react';
import style from './Loading.module.scss';

function Loading() {
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

export default Loading;
