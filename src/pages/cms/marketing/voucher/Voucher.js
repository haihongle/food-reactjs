import Toast from '../../../../components/toast-message/ToastMessage';

function Voucher() {
	return (
		<div>
			<h1>Voucher page</h1>
			<button onClick={() => Toast.success('haha')}>BUTTON</button>
		</div>
	);
}

export default Voucher;
