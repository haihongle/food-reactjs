import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import handleDatetime from '../../utils/HandleDatetime';
import styles from './CustomModal.module.scss';

function camelCaseToNormal(text) {
	const result = text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
	return result.charAt(0).toUpperCase() + result.slice(1);
}

const createValidationSchema = (data) => {
	return Yup.object().shape(
		data
			? Object.keys(data).reduce((acc, key) => {
					const value = data[key];
					if (value === null) return acc;

					if (typeof value === 'string') {
						acc[key] = Yup.string().required('Required');
					} else if (typeof value === 'number') {
						acc[key] = Yup.number().required('Required').positive('Invalid!');
					} else if (Array.isArray(value)) {
						if (value.length > 0 && typeof value[0] === 'object') {
							acc[key] = Yup.array().of(createValidationSchema(value[0])).required('Required');
						}
					} else if (typeof value === 'boolean') {
						acc[key] = Yup.boolean().required('Required');
					}

					return acc;
				}, {})
			: {}
	);
};

const renderField = (key, value, isEditing, hiddenFields) => {
	if (hiddenFields.includes(key)) return null;

	if (typeof value === 'string') {
		return (
			<div className="col-md-4" key={key}>
				<div className={styles['input-container']}>
					<label className={styles['input-label']} htmlFor={key}>
						{camelCaseToNormal(key)}
					</label>
					<Field name={key} type="text" className={styles['input-field']} disabled={!isEditing} />
					<ErrorMessage name={key} component="div" className={styles['input-error']} />
				</div>
			</div>
		);
	} else if (typeof value === 'number') {
		return (
			<div className="col-md-4" key={key}>
				<div className={styles['input-container']}>
					<label className={styles['input-label']} htmlFor={key}>
						{camelCaseToNormal(key)}
					</label>
					<Field name={key} type="number" className={styles['input-field']} disabled={!isEditing} />
					<ErrorMessage name={key} component="div" className={styles['input-error']} />
				</div>
			</div>
		);
	} else if (Array.isArray(value)) {
		return (
			<div className="table-responsive" key={key}>
				{value.length > 0 && (
					<div className="col-12 table-responsive">
						<table className={styles.tableContainer}>
							<thead>
								<tr>
									{Object.keys(value[0]).map((subKey, index) => {
										if (hiddenFields.includes(subKey)) return null;
										return <th key={index}>{camelCaseToNormal(subKey)}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{value.map((item, index) => {
									return (
										<tr key={index}>
											{Object.keys(item).map((subKey, propIndex) => {
												if (hiddenFields.includes(subKey)) return null;
												const subValue = item[subKey];
												const fieldType = typeof subValue === 'boolean' ? 'checkbox' : 'text';
												return (
													<td key={propIndex}>
														<Field
															name={`${key}.${index}.${subKey}`}
															type={fieldType}
															className="form-control"
															disabled={!isEditing || fieldType === 'checkbox'}
														/>
														<ErrorMessage
															name={`${key}.${index}.${subKey}`}
															component="div"
															className={styles['input-error']}
														/>
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	} else if (typeof value === 'boolean') {
		return (
			<div className="col-md-4 d-flex align-items-center" key={key}>
				<label className={styles['input-checkbox']}>{camelCaseToNormal(key)}</label>
				<Field
					type="checkbox"
					name={key}
					className={styles['custom-checkbox']}
					disabled={!isEditing}
				/>
				<ErrorMessage name={key} component="div" className={styles['input-error']} />
			</div>
		);
	}
	return null;
};

function CustomModalDetail({ detailData, actions, hiddenFields = [] }) {
	const [detail, setDetail] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [modalSize, setModalSize] = useState(0);

	useEffect(() => {
		if (detailData) {
			let maxModalSize = 0;
			const tempData = {};
			const arrayFields = {};
			for (const key in detailData) {
				const value = detailData[key];
				if (Array.isArray(value) && value.length > 0) {
					arrayFields[key] = value;
					value.forEach((item) => {
						if (typeof item === 'object' && item !== null) {
							const itemKeyCount = Object.keys(item).length;
							if (itemKeyCount > maxModalSize) {
								maxModalSize = itemKeyCount;
							}
						}
					});
				} else {
					tempData[key] = value;
				}
			}
			const reorderedData = { ...tempData, ...arrayFields };
			const formattedData = handleDatetime(reorderedData);
			setDetail(formattedData);
			setModalSize(maxModalSize);
		}
	}, [detailData]);

	useEffect(() => {
		if (detailData) {
			const modal = new window.bootstrap.Modal(document.getElementById('detailModal'));
			modal.show();
			const handleModalClose = () => {
				setIsEditing(false);
			};
			const modalElement = document.getElementById('detailModal');
			modalElement.addEventListener('hidden.bs.modal', handleModalClose);
			return () => {
				modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
			};
		}
	}, [detailData]);

	const initialValues = detail
		? Object.keys(detail).reduce((acc, key) => {
				if (Array.isArray(detail[key])) {
					acc[key] = detail[key].map((item) => {
						return handleDatetime(item);
					});
				} else {
					acc[key] = detail[key] !== null && detail[key] !== undefined ? detail[key] : '';
				}
				return acc;
			}, {})
		: {};

	const toggleEditMode = (resetForm) => {
		if (isEditing) {
			resetForm();
		}
		setIsEditing(!isEditing);
	};

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
		<div className="modal fade" id="detailModal" data-bs-backdrop="static">
			<div className={`modal-dialog ${getModalClass(modalSize)}`}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Details</h5>
						<button className="btn btn-sm btn-danger" data-bs-dismiss="modal">
							X
						</button>
					</div>
					<div className="modal-body">
						{detail && (
							<Formik
								initialValues={initialValues}
								validationSchema={createValidationSchema(detail)}
								enableReinitialize
								onSubmit={async (values) => {
									await actions.update(values);
									setIsEditing(false);
								}}
							>
								{({ handleSubmit, resetForm }) => (
									<>
										<Form>
											<div className="row gx-4 gy-3 ps-2 pe-2 pb-4">
												{Object.keys(detail).map((key) =>
													renderField(key, detail[key], isEditing, hiddenFields)
												)}
											</div>
										</Form>
										<div className="modal-footer">
											{isEditing && (
												<button className="btn btn-primary" onClick={handleSubmit}>
													Update
												</button>
											)}
											{actions && (
												<button
													className={`${isEditing ? 'btn-danger' : 'btn-secondary'} btn`}
													onClick={() => toggleEditMode(resetForm)}
												>
													{isEditing ? 'Cancel' : 'Edit'}
												</button>
											)}
										</div>
									</>
								)}
							</Formik>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

CustomModalDetail.propTypes = {
	detailData: PropTypes.object,
};

export default CustomModalDetail;
