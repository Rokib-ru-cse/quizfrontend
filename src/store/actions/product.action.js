import axios from "../../helpers/axios";
import { productConstants } from "./actionConstants";

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.ADD_PRODUCT_REQUEST })

        const res = await axios.post('/product/create', form)
        if (res.status == 201) {
            dispatch({
                type: productConstants.ADD_PRODUCT_SUCCESS,
                payload: res.data.message
            })
        } else {
            dispatch({
                type: productConstants.ADD_PRODUCT_FAILURE,
                payload: res.data.error
            })
        }
    }
}

export const getProductPage = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.GET_PRODUCT_BY_PAGE_REQUEST })
            const { cid, type } = payload.params
            const res = await axios.get(`/page/${cid}/${type}`);
            if (res.status === 200) {
                const { page } = res.data
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_PAGE_SUCCESS,
                    payload: { page }
                })

            } else {
                const { error } = res.data

                dispatch({
                    type: productConstants.GET_PRODUCT_BY_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log('product action page ',error);
        }
    }
}

export const getProductDetailsById = (payload)=>{
return async (dispatch)=>{
    dispatch({type:productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST})
    let res;
    try{
        const productId = payload
        res = await axios.get(`/product/${productId}`) 
        if(res.status===200){
            dispatch({
                type:productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload:{productDetails:res.data.product}
            })
        }else{
            dispatch({
                type:productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }catch(error){
        dispatch({
            type:productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
            payload:{error:res.data.error}
        })
    }
}
}

export const changeCategoryGetProduct = (flag)=>{
    return dispatch=>{
        dispatch({
            type:productConstants.CHANGE_CATEGORY_GET_PRODUCT,
            payload:flag
        })
    }
}