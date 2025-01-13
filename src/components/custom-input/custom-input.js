const NormalInput = ({ field }) => {
	return (
		<div className="col-md-3 d-flex">
			<label className="btn btn-primary text-nowrap rounded-end-0" htmlFor={field}>
				{field}
			</label>
			<input id={field} type="text" name={field} className="form-control rounded-start-0" />
		</div>
	);
};

const DateInput = ({ field }) => {
	return (
		<div className="col-md-3 d-flex">
			<label className="btn btn-primary text-nowrap rounded-end-0" htmlFor={field}>
				{field}
			</label>
			<input id={field} type="date" name={field} className="form-control rounded-start-0" />
		</div>
	);
};

const SelectInput = ({ field, options }) => {
	return (
		<div className="col-md-3 d-flex">
			<label className="btn btn-primary text-nowrap rounded-end-0" htmlFor={field}>
				{field}
			</label>
			<select name={field} className="form-select rounded-start-0">
				<option value="">Select {field}</option>
				{options &&
					options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.name}
						</option>
					))}
			</select>
		</div>
	);
};

const Input = ({ type, field, options }) => {
	switch (type) {
		case 'input':
			return <NormalInput field={field} />;
		case 'input-date':
			return <DateInput field={field} />;
		case 'select':
			return <SelectInput field={field} options={options} />;
		default:
			return <div>Element not found</div>;
	}
};

export default Input;
