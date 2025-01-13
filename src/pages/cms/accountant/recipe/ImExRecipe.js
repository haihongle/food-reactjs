import {useEffect, useState} from 'react';
import ImExRecipeService from '../../../../services/accountantService/ImExRecipeService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import * as Yup from 'yup';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CardHeader from '../../../../components/card-header/CardHeader';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import CustomModalForm from '../../../../components/custom-modal/CustomModalForm';
import Toast from '../../../../components/toast-message/ToastMessage';
import MaterialService from "../../../../services/warehouseServices/MaterialService";

export default function ImExRecipe({repType}) {
    const [imExRecipeList, setImExRecipeList] = useState([]);
    const [pageCount, setPageCount] = useState(null);
    const [detailData, setDetailData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
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

    const paginate = ({selected}) => {
        setPagination({
            page: selected,
            size: 10,
        });
    };
    useEffect(() => {
        getRecipeList();

        const materialPage = {
            page: 0,
            size: 100,
        };
        getMaterials(materialPage);
    }, [pagination]);

    const getRecipeList = async (page) => {
        try {
            const response = await ImExRecipeService.getList(page, repType);
            if (response.success) {
                setImExRecipeList(response.data);
                setPageCount(Math.ceil(response.data.length / pagination.size));
            } else {
                Toast.error(response.message);
            }
        } catch (error) {
            Toast.error(error);
        }
    };

	const createNewRecipe = async (data) => {
		const recipeData = {
			...data,
			repType: repType,
		};
		await ServiceMethods.add(ImExRecipeService.createNew, recipeData, getRecipeList);
	};

    const getDetail = async (id) => {
        const data = await ServiceMethods.detail(ImExRecipeService.getDetail, id);
        setDetailData(data);
    };

    return (
        <>
            <CustomModalForm
                title={'Import recipe'}
                properties={[
                    {
                        label: 'Responsible By',
                        field: 'responsibleBy',
                        type: 'number',
                        validation: Yup.number().required('Responsible By is required'),
                        className: 'col-md-6',
                    },
                    {
                        label: 'Rep type',
                        field: 'repType',
                        type: 'select',
                        options: [
                            {
                                label: 'Import',
                                value: 'IMPORT',
                            },
                            {
                                label: 'Export',
                                value: 'EXPORT',
                            }
                        ],
                        validation: Yup.string().required('Report Type is required'),
                        className: 'col-md-6',
                    },
                    {
                    	label: 'Supplier',
                    	field: 'supplier',
                    	type: 'text',
                    	className: 'col-md-6',
                    },
                    {
                        label: 'Purpose',
                        field: 'purpose',
                        type: 'select',
                        options: [
                            {
                                label: 'BALANCING',
                                value: 'BALANCING',
                            },
                            {
                                label: 'BUSINESS',
                                value: 'BUSINESS',
                            }
                        ],
                        validation: Yup.string().required('purpose is required'),
                        className: 'col-md-6',
                    },
                    {
                        label: 'Description',
                        field: 'description',
                        type: 'text-area',
                        className: 'col-md-12',
                    },
                ]}
                modalID="importRecipeModal"
                tableFieldName="detailList"
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
                        validation: Yup.number().min(1).required('Quantity is required'),
                    },
                    {
                        label: 'Factory Date',
                        field: 'factoryDate',
                        type: 'date',
                    },
                    {
                        label: 'Total Value',
                        field: 'totalValue',
                        type: 'number',
                        validation: Yup.number()
                            // .positive('Invalid total value')
                            .required('Total Value is required'),
                    },
                ]}
                submitFunction={(values) => createNewRecipe(values)}
            />
            <CustomModalDetail detailData={detailData}></CustomModalDetail>
            <CardHeader
                pageCount={pageCount}
                paginateFunction={paginate}
                modalID={'#importRecipeModal'}
                buttonName={'Create new recipe'}
            />
			<div className="card-body">
				<CustomTable
					data={imExRecipeList}
					actions={{
						detail: getDetail,
					}}
					hiddenFields={['id', 'createdBy', 'updatedBy', 'updatedAt', 'responsibleBy']}
				/>
			</div>
        </>
    );
}
