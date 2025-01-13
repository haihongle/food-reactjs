import { useEffect, useState } from 'react';
import menuServices from '../../../../services/menuServices/MenuServices';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import MaterialService from "../../../../services/warehouseServices/MaterialService";
import Toast from "../../../../components/toast-message/ToastMessage";

function MenuList() {
	const [menuList, setMenuList] = useState([]);
	const [pageCount, setPageCount] = useState(null);
	const [detailData, setDetailData] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const [pagination, setPagination] = useState({
		page: 0,
		size: 5,
	});

	//fetch data for selecting materials
	const [materialList, setMaterialList] = useState([]);
	const getMaterials = async (page) => {
		try {
			const response = await MaterialService.getMaterials(page);
			if (response.success) {
				setMaterialList(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const paginate = ({ selected }) => {
		setPagination({
			page: selected,
			size: 10,
		});
	};
	useEffect(() => {
		getMenu();

		const materialPage = {
			page: 0,
			size: 100,
		};
		getMaterials(materialPage);
	}, [pagination]);

	const getMenu = async () => {
		try {
			const response = await menuServices.getList(pagination);
			if (response.success) {
				setMenuList(response.data);
				setPageCount(response.metaData.totalPage);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	const addMenu = async (values) => {
		await ServiceMethods.add(menuServices.createNew, values, getMenu);
	};

	const detailMenu = async (id) => {
		const data = await ServiceMethods.detail(menuServices.getDetail, id);
		setDetailData(data);
	};

	const updateMenu = async (updatedData) => {
		const { menuDishId, menuDishName, materialList, ...rest } = updatedData;
		const filteredMaterialList = updatedData.materialList.map(
			({ materialId, quantity, note, prepareTime }) => ({
				materialId,
				quantity,
				note,
				prepareTime,
			})
		);
		const requestUpdatedData = {
			...rest,
			name: menuDishName,
			menuDishDetailList: filteredMaterialList,
			updatedBy: user?.username || null,
		};
		await ServiceMethods.update(menuServices.updateDish, menuDishId, requestUpdatedData, getMenu);
	};

	const toggleActiveItem = async (menuId) => {
		await ServiceMethods.toggleById(menuServices.activeDish, menuId, getMenu);
	};

	return (
		<>
			<CustomModalForm
				title={'Add new menu'}
				modalID="addMenuModal"
				properties={[
					{
						label: 'Name',
						field: 'name',
						type: 'text',
						validation: Yup.string().required('Name is required'),
						className: 'col-md-6',
					},
					{
						label: 'Description public',
						field: 'descriptionPublic',
						type: 'text',
						validation: Yup.string().required('Description is required'),
						className: 'col-md-6',
					},
					{
						label: 'Description private',
						field: 'descriptionPrivate',
						type: 'text',
						validation: Yup.string().required('Description is required'),
						className: 'col-md-6',
					},
					{
						label: 'Price',
						field: 'price',
						type: 'number',
						validation: Yup.number().positive('Price is in valid').required('Price is required'),
						className: 'col-md-6',
					},
					{
						label: 'Category',
						field: 'category',
						type: 'text',
						validation: Yup.string().required('Category is required'),
						className: 'col-md-6',
					},
				]}
				detailProperties={[
					{
						label: 'Material',
						field: 'materialId',
						type: 'select',
						options: materialList.map(material => ({
							value: material.id,  // Use the material ID as the value
							label: material.name + ' (' + material.unitType + ')' // Use the material name as the display label
						})),
						validation: Yup.number()
							.positive('Material ID is invalid')
							.required('Material ID is required'),
					},
					{
						label: 'Quantity',
						field: 'quantity',
						type: 'number',
						validation: Yup.number()
							.positive('Quantity is in valid')
							.required('Quantity is required'),
					},
					{
						label: 'Note',
						field: 'note',
						type: 'text',
					},
					{
						label: 'Prepare time',
						field: 'prepareTime',
						type: 'number',
						placeholder:"minute",
						validation: Yup.number()
							.positive('Invalid prepare time')
							.required('Prepare time is required (minutes)'),
					},
				]}
				tableFieldName="menuDishDetailList"
				submitFunction={(values) => addMenu(values)}
			/>
			<CustomModalDetail
				detailData={detailData}
				actions={{ update: updateMenu }}
				hiddenFields={['updatedBy', 'isActive']}
			/>
			<CardHeader
				pageCount={pageCount}
				paginateFunction={paginate}
				modalID={'#addMenuModal'}
				buttonName={'Add new menu'}
			/>
			<div className="card-body">
				<CustomTable
					data={menuList}
					actions={{
						detail: detailMenu,
						toggle: { function: toggleActiveItem, tooltip: 'Toggle active dish' },
					}}
					hiddenFields={['id', 'price', 'createdBy', 'updatedBy', 'updatedAt', 'image']}
				/>
			</div>
		</>
	);
}

export default MenuList;
