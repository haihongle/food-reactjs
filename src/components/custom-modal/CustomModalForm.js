import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './CustomModal.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const createValidationSchema = (properties = [], detailProperties = [], tableFieldName) => {
	const validationObj = properties.reduce((acc, { field, validation }) => {
		acc[field] = validation;
		return acc;
	}, {});

	if (detailProperties.length > 0) {
		validationObj[tableFieldName] = Yup.array().of(
			Yup.object().shape(
				detailProperties.reduce((acc, { field, validation }) => {
					acc[field] = validation;
					return acc;
				}, {})
			)
		);
	}

	return Yup.object().shape(validationObj);
};

const renderTable = (values, detailProperties, tableFieldName, setFieldValue) => (
	<FieldArray name={tableFieldName}>
		{({ remove }) => (
			<div className="table-responsive">
				<table className={styles.tableContainer}>
					<thead>
						<tr>
							{detailProperties.map(({ label }, index) => (
								<th key={index}>{label}</th>
							))}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{values[tableFieldName].map((row, rowIndex) =>
							renderTableRow(row, rowIndex, detailProperties, remove, tableFieldName, setFieldValue)
						)}
					</tbody>
				</table>
			</div>
		)}
	</FieldArray>
);

const renderTableRow = (row, rowIndex, detailProperties, remove, tableFieldName, setFieldValue) => (
	<tr key={rowIndex}>
		{detailProperties.map(({ field, type, options, label }) => (
			<td key={`${rowIndex}-${field}`}>
				{renderInputField(field, rowIndex, { type, label, options }, tableFieldName, setFieldValue)}
				<ErrorMessage
					name={`${tableFieldName}[${rowIndex}].${field}`}
					component="div"
					className="text-danger"
				/>
			</td>
		))}
		<td className="text-center">
			<i
				className="fa-solid text-danger fa-circle-minus fs-5 cms_normal-hover"
				data-tooltip-id="removeRow-tooltip"
				data-tooltip-content="Remove row"
				data-tooltip-delay-show="50"
				data-tooltip-place="right-start"
				onClick={() => remove(rowIndex)}
			></i>
			<Tooltip id="removeRow-tooltip" />
		</td>
	</tr>
);

const renderInputField = (field, rowIndex, detailProperties, tableFieldName, setFieldValue) => {
	const { type, label, options } = detailProperties;
	switch (type) {
		case 'select':
			return (
				<Field name={`${tableFieldName}[${rowIndex}].${field}`}>
					{({ field }) => (
						<select {...field} className="form-select">
							<option value="" disabled>
								Select {label}
							</option>
							{options && options.length > 0 ? (
								options.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))
							) : (
								<option value="">No options availabel</option>
							)}
						</select>
					)}
				</Field>
			);
		case 'checkbox':
			return (
				<Field name={`${tableFieldName}[${rowIndex}].${field}`}>
					{({ field }) => (
						<div>
							<input type="checkbox" {...field} className="form-check-input" />
							<label className="form-check-label">{label}</label>
						</div>
					)}
				</Field>
			);
		case 'date':
			return (
				<Field name={`${tableFieldName}[${rowIndex}].${field}`}>
					{({ field: { name, value } }) => (
						<DatePicker
							selected={value}
							onChange={(date) => setFieldValue(name, date)}
							dateFormat="dd/MM/yyyy"
							className="form-control"
							autoComplete="off"
						/>
					)}
				</Field>
			);
		case 'number':
			return (
				<Field
					name={`${tableFieldName}[${rowIndex}].${field}`}
					type="number"
					className="form-control"
				/>
			);
		case 'time':
			return (
				<Field
					name={`${tableFieldName}[${rowIndex}].${field}`}
					type="number"
					className="form-control"
					autoComplete="off"
				/>
			);

		case 'text':
			return (
				<Field
					name={`${tableFieldName}[${rowIndex}].${field}`}
					type="text"
					className="form-control"
				/>
			);
		default:
			return <>Invalid input field</>;
	}
};

const CustomModalForm = ({
	title,
	properties = [],
	detailProperties = [],
	modalID,
	submitFunction,
	tableFieldName = 'tableField',
}) => {
	const validationSchema = createValidationSchema(properties, detailProperties, tableFieldName);
	const modalSize = detailProperties.length;
	const getModalClass = (size) => {
		if (size === 0) {
			return 'modal-lg';
		} else if (size < 5) {
			return 'modal-xl';
		} else {
			return styles['modal-xxl'];
		}
	};

	return (
		<>
			{properties.length > 0 ? (
				<div className="modal fade" data-bs-backdrop="static" id={modalID}>
					<div className={`modal-dialog ${getModalClass(modalSize)}`}>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{title}</h5>
							</div>
							<div className="modal-body">
								<Formik
									initialValues={{
										...properties.reduce((acc, { field, initialValue }) => {
											acc[field] = initialValue || '';
											return acc;
										}, {}),
										[tableFieldName]: [],
									}}
									validationSchema={validationSchema}
									enableReinitialize
									onSubmit={async (values, { setSubmitting, resetForm }) => {
										const res = await submitFunction(values);
										if (res) {
											resetForm();
										}
										setSubmitting(false);
									}}
								>
									{({ isSubmitting, values, setFieldValue, resetForm }) => (
										<Form>
											<div className="row gy-2 pt-2 pb-2">
												{properties.map(({ label, field, type, className, options }, index) => (
													<div key={index} className={className || 'col-12'}>
														<div className={`${styles['input-container']}`}>
															<label htmlFor={field} className={`${styles['input-label']}`}>
																{label}
															</label>
															{type === 'select' && (
																<Field
																	name={field}
																	as="select"
																	className={`${styles['input-field']}`}
																>
																	<option value="" disabled>
																		Select {label}
																	</option>
																	{options &&
																		options.map((option) => (
																			<option key={option.value} value={option.value}>
																				{option.label}
																			</option>
																		))}
																</Field>
															)}
															{type === 'text-area' && (
																<Field
																	name={field}
																	as="textarea"
																	className={`${styles['input-field']}`}
																	autoComplete="off"
																/>
															)}

															{type !== 'select' && type !== 'text-area' && (
																<Field
																	name={field}
																	type={type}
																	className={`${styles['input-field']}`}
																	autoComplete="off"
																/>
															)}
														</div>
														<ErrorMessage
															name={field}
															component="div"
															className={`${styles['input-error']}`}
														/>
													</div>
												))}
											</div>
											{detailProperties &&
												detailProperties.length > 0 &&
												renderTable(values, detailProperties, tableFieldName, setFieldValue)}
											<div className="modal-footer mt-2">
												{detailProperties && detailProperties.length > 0 && (
													<FieldArray name={tableFieldName}>
														{({ push }) => (
															<button
																type="button"
																className="btn btn-secondary"
																onClick={() =>
																	push(
																		detailProperties.reduce((acc, { field, initialValue }) => {
																			acc[field] = initialValue || '';
																			return acc;
																		}, {})
																	)
																}
															>
																Add Row
															</button>
														)}
													</FieldArray>
												)}
												<button type="submit" className="btn btn-primary" disabled={isSubmitting}>
													{isSubmitting ? (
														<span className="spinner-border spinner-border-sm"></span>
													) : (
														'Submit'
													)}
												</button>
												<button
													type="button"
													className="btn btn-danger"
													data-bs-dismiss="modal"
													onClick={resetForm}
												>
													Cancel
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>No properties availabel</p>
			)}
		</>
	);
};

export default CustomModalForm;
