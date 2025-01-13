import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NormalInput = ({ field, className }) => (
	<div className={className || 'col-md-3'}>
		<div className="row g-0">
			<label className="text-nowrap btn btn-primary rounded-end-0 col-4" htmlFor={field}>
				{field}
			</label>
			<div className="col-8">
				<input
					type="text"
					name={field.replace(/\s+/g, '').toLowerCase()}
					className="form-control rounded-start-0"
					autoComplete="off"
				/>
			</div>
		</div>
	</div>
);

const NumberInput = ({ field, className }) => (
	<div className={className || 'col-md-3'}>
		<div className="row g-0">
			<label className="text-nowrap btn btn-primary rounded-end-0 col-4" htmlFor={field}>
				{field}
			</label>
			<div className="col-8">
				<input
					type="number"
					name={field.replace(/\s+/g, '').toLowerCase()}
					className="form-control rounded-start-0"
					autoComplete="off"
				/>
			</div>
		</div>
	</div>
);

const DateInput = ({ field, className }) => {
	const [selectedDate, setSelectedDate] = useState(null);
	return (
		<div className={className || 'col-md-3'}>
			<div className="row g-0">
				<label className="text-nowrap btn btn-primary rounded-end-0 col-4">{field}</label>
				<div className="col-8">
					<DatePicker
						name={field.replace(/\s+/g, '').toLowerCase()}
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						dateFormat="dd/MM/yyyy"
						wrapperClassName="w-100"
						className="form-control rounded-start-0"
						autoComplete="off"
					/>
				</div>
			</div>
		</div>
	);
};

const SelectInput = ({ field, options, className }) => (
	<div className={className || 'col-md-3'}>
		<div className="row g-0">
			<label className="text-nowrap btn btn-primary rounded-end-0 col-4">{field}</label>
			<div className="col-8">
				<select
					name={field.replace(/\s+/g, '').toLowerCase()}
					className="form-select rounded-start-0"
				>
					<option value="">Select {field}</option>
					{options &&
						options.map((option, index) => (
							<option key={index} value={option.value}>
								{option.name}
							</option>
						))}
				</select>
			</div>
		</div>
	</div>
);

const CustomInput = ({ type, field, options, className }) => {
	switch (type) {
		case 'text':
			return <NormalInput field={field} className={className} />;
		case 'number':
			return <NumberInput field={field} className={className} />;
		case 'date':
			return <DateInput field={field} className={className} />;
		case 'select':
			return <SelectInput field={field} options={options} className={className} />;
		default:
			return <div>Element not found</div>;
	}
};

export default CustomInput;
