import axios from "../../helpers/axios";
import { categoryConstants, productConstants } from "./actionConstants";

export const getInitialData = ()=>{
    return async (dispatch)=>{
        
        const res = await axios.post('/initialdata')
        const {products,categories} = res.data
        if(res.status==200){
            dispatch({
                type:categoryConstants.GET_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({
                type:productConstants.GET_PRODUCT_SUCCESS,
                payload:[...products]
                
            })
        }
    }    
}
