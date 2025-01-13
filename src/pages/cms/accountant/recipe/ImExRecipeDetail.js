import {useEffect, useState} from "react";
import Toast from "../../../../components/toast-message/ToastMessage";
import Table from "../../../../components/custom-table/CustomTable";
import ImExRecipeService from "../../../../services/accountantService/ImExRecipeService";
import {useParams} from "react-router";

export default function ImExRecipeDetail() {
    const {id} = useParams();
    const [recipeInfo, setRecipeInfo] = useState({});
    const [recipeDetail, setRecipeDetail] = useState([]);

    const getRecipeInfo = async (id) => {
        try {
            const response = await ImExRecipeService.getDetail(id);
            if (response.success) {
                setRecipeInfo(response.data);
                setRecipeDetail(response.data.imExDetailList);
            } else {
                Toast.error(response.message);
            }
        } catch (error) {
            Toast.error(error);
        }
    };

    useEffect(() => {
        getRecipeInfo(id)
    }, [id])

    return (
        <>
            <div className="card-header">
                Recipe Detail
            </div>
            <div>
                <div>Rep Type: {recipeInfo.repType}</div>
                <div>Created at: {recipeInfo.createdAt}</div>
                <div>Updated at: {recipeInfo.updatedAt}</div>
                <div>Created by: {recipeInfo.createdByName}</div>
                <div>Responsible by: {recipeInfo.responsibleName}</div>
                <div>Description: {recipeInfo.description}</div>
                <div>Purpose: {recipeInfo.purpose}</div>
            </div>
            <div className="card-body">
                {recipeDetail && (<Table data={recipeDetail}/>)}
            </div>
        </>
    );
}
