import moment from 'moment';

const calculateOrderTime = (isoString) => {
	const futureDate = moment(isoString);
	const now = moment();

	if (futureDate.clone().add(30, 'minutes').diff(now) < 0) {
		return 'danger';
	}
	if (futureDate.clone().add(15, 'minutes').diff(now) < 0) {
		return 'warning';
	}
	return 'fine';
};

const calculateInventoryTime = (isoString, shelfLife, warningThreshold = 3) => {
	const futureDate = moment(isoString);
	const now = moment();
	const expirationDate = futureDate.clone().add(shelfLife, 'days');
	console.log(futureDate, expirationDate);

	if (expirationDate.diff(now) < 0) {
		return 'danger';
	}
	if (expirationDate.diff(now) <= warningThreshold * 24 * 60 * 60 * 1000) {
		return 'warning';
	}
	return 'fine';
};

const calculateTime = {
	calculateOrderTime,
	calculateInventoryTime,
};

export default calculateTime;
