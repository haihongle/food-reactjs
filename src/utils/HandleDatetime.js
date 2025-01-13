import moment from 'moment';

const findDateStrings = (data) => {
	const dateKeys = [];
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key];
			if (typeof value === 'string') {
				const isValidISO = moment(value, moment.ISO_8601, true).isValid();
				if (isValidISO) {
					dateKeys.push(key);
				}
			}
		}
	}
	return dateKeys;
};

const handleDatetime = (dataObject) => {
	const formattedData = { ...dataObject };
	const dateKeys = findDateStrings(dataObject);

	dateKeys.forEach((key) => {
		const dateValue = dataObject[key];
		const momentDate = moment(dateValue, moment.ISO_8601, true);

		if (momentDate.isValid()) {
			if (momentDate.format('YYYY-MM-DD') === '0000-01-01') {
				formattedData[key] = momentDate.format('HH:mm');
			} else if (momentDate.format('HH:mm:ss') !== '00:00:00') {
				formattedData[key] = momentDate.format('DD/MM/YYYY - HH:mm');
			} else {
				formattedData[key] = momentDate.format('DD/MM/YYYY');
			}
		}
	});

	return formattedData;
};


export default handleDatetime;
