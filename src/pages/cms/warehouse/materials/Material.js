import { useState, useEffect } from 'react';
import MaterialService from '../../../../services/warehouseServices/MaterialService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import OrderService from "../../../../services/orderServices/OrderService";
import Toast from "../../../../components/toast-message/ToastMessage";

function Material() {
	const [dataMaterials, setDataMaterials] = useState([]);
	const [pageCount, setPageCount] = useState(null);
	const [detailData, setDetailData] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const [pagination, setPagination] = useState({
		page: 0,
		size: 10,
	});

	const paginate = ({ selected }) => {
		setPagination({
			page: selected,
			size: 10,
		});
	};
	useEffect(() => {
		getMaterials();
	}, [pagination]);

	const getMaterials = async (phantrang) => {
		// await ServiceMethods.get(MaterialService.getMaterials, pagination, (data) => {
		// 	setDataMaterials(data);
		// 	console.log(data)
		// 	// setPageCount(data.metaData.totalPage);
		// });

		try {
			const response = await MaterialService.getMaterials(pagination);
			if (response.success) {
				setDataMaterials(response.data);
				setPageCount(response.metaData.totalPage);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const addMaterials = async (values) => {
		await ServiceMethods.add(MaterialService.addMaterials, values, getMaterials);
	};

	const detailMaterial = async (id) => {
		const data = await ServiceMethods.detail(MaterialService.detailMaterial, id);
		setDetailData(data);
	};

	const updateMaterial = async (updatedData) => {
		const { id, name, code, shelfLife, unitType, description } = updatedData;
		const requestUpdatedData = {
			name: name,
			code: code,
			shelfLife: shelfLife,
			unitType: unitType,
			description: description,
		};
		await ServiceMethods.update(
			MaterialService.updateMaterials,
			id,
			requestUpdatedData,
			getMaterials
		);
	};

	const deleteMaterial = async (id) => {
		await ServiceMethods.detail(MaterialService.deleteMaterials, id, getMaterials);
	};

	return (
		<>
			<CustomModalForm
				title={'Add new material'}
				modalID="addMaterialModal"
				properties={[
					{
						label: 'Name',
						field: 'name',
						type: 'text',
						validation: Yup.string().required('Name is required'),
						className: 'col-md-6',
					},
					{
						label: 'Code',
						field: 'code',
						type: 'text',
						validation: Yup.string().required('Code is required'),
						className: 'col-md-6',
					},
					{
						label: 'ShelfLife',
						field: 'shelfLife',
						type: 'number',
						validation: Yup.number()
							.required('Shelf Life is required')
							.min(0, 'Shelf Life must be a positive number'),
						className: 'col-md-6',
					},
					{
						label: 'Unit type',
						field: 'unitType',
						type: 'select',
						options: [
							{
								label: 'Piece',
								value: 'PIECE',
							},
							{
								label: 'Kilogram',
								value: 'KILOGRAM',
							},
							{
								label: 'Gram',
								value: 'GRAM',
							},
							{
								label: 'Pair',
								value: 'PAIR',
							},
						],
						validation: Yup.string().required('Unit Type is required'),
						className: 'col-md-6',
					},
					{
						label: 'Description',
						field: 'description',
						type: 'text-area',
						className: 'col-md-12',
					},
				]}
				submitFunction={(values) => addMaterials(values)}
			/>
			<CustomModalDetail
				detailData={detailData}
				actions={{ update: updateMaterial }}
				hiddenFields={['id']}
			/>
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				modalID={'#addMaterialModal'}
				buttonName={'Add material'}
			/>
			<div className="card-body">
				<CustomTable
					data={dataMaterials}
					actions={{
						detail: detailMaterial,
						update: updateMaterial,
						delete: deleteMaterial,
					}}
					hiddenFields={['id', 'createdBy', 'updatedBy', 'updatedAt']}
				/>
			</div>
		</>
	);
}

export default Material;
