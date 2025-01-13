import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Toast from '../../../../components/toast-message/ToastMessage';
import ImExRecipeService from '../../../../services/accountantService/ImExRecipeService';
import MaterialService from '../../../../services/warehouseServices/MaterialService';

export default function CreateRecipeForm() {
	const initialValues = {
		responsibleBy: 1,
		description: '',
		repType: 'IMPORT',
		purpose: 'BALANCE',
		supplier: '',
		detailList: [
			{
				quantity: '',
				materialId: '',
				factoryDate: '',
				note: '',
				totalValue: '',
			},
		],
	};

	const [materials, setMaterials] = useState([]);
	const fetchMaterialList = async () => {
		try {
			const response = await MaterialService.getMaterials();
			if (response.success) {
				setMaterials(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error('Failed to fetch material list');
		}
	};

	useEffect(() => {
		fetchMaterialList();
	}, []);

	const validationSchema = Yup.object().shape({
		responsibleBy: Yup.number().required('Responsible By is required'),
		repType: Yup.string().required('Report Type is required'),
		purpose: Yup.string().required('Purpose is required'),
		detailList: Yup.array().of(
			Yup.object().shape({
				quantity: Yup.number().min(1).required('Quantity is required'),
				materialId: Yup.number(),
				factoryDate: Yup.date(),
				note: Yup.string(),
				totalValue: Yup.number(),
			})
		),
	});

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validationSchema}>
				{({ values }) => (
					<Form>
						<div>
							<label>Description:</label>
							<Field name="description" type="text" />
							<ErrorMessage name="description" component="div" />
						</div>
						<div>
							<label>Report Type:</label>
							<Field name="repType" as="select">
								<option value="IMPORT">IMPORT</option>
								<option value="EXPORT">EXPORT</option>
							</Field>
							<ErrorMessage name="repType" component="div" />
						</div>
						<div>
							<label>Purpose:</label>
							<Field name="purpose" as="select">
								<option value="BALANCING">BALANCE</option>
								<option value="BUSINESS">BUSINESS</option>
							</Field>
							<ErrorMessage name="purpose" component="div" />
						</div>
						<div>
							<label>Supplier:</label>
							<Field name="supplier" type="text" />
							<ErrorMessage name="supplier" component="div" />
						</div>

						<FieldArray name="detailList">
							{({ insert, remove, push }) => (
								<div>
									{values.detailList.length > 0 &&
										values.detailList.map((detail, index) => (
											<div key={index}>
												<h4>Material #{index + 1}</h4>
												<div>
													<label>Quantity:</label>
													<Field name={`detailList.${index}.quantity`} type="number" />
													<ErrorMessage name={`detailList.${index}.quantity`} component="div" />
												</div>
												<div>
													<label>Material ID:</label>
													<Field name={`detailList.${index}.materialId`} as="select">
														{materials.map((material) => (
															<option value={material.id}>{material.name}</option>
														))}
													</Field>
												</div>
												<div>
													<label>Factory Date:</label>
													<Field name={`detailList.${index}.factoryDate`} type="datetime-local" />
												</div>
												<div>
													<label>Note:</label>
													<Field name={`detailList.${index}.note`} type="text" />
												</div>
												<div>
													<label>Total Value:</label>
													<Field name={`detailList.${index}.totalValue`} type="number" />
												</div>
												<button type="button" onClick={() => remove(index)}>
													Remove
												</button>
											</div>
										))}
									<button
										type="button"
										onClick={() =>
											push({
												quantity: '',
												materialId: '',
												factoryDate: '',
												note: '',
												totalValue: '',
											})
										}
									>
										Add Detail
									</button>
								</div>
							)}
						</FieldArray>

						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
			test
		</div>
	);
}
