import axios from "../../helpers/axios";
import { productConstants } from "./actionConstants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST,
      });
      const res = await axios.get(`/products/${slug}`);
      console.log('slug response',res.data);
      if (res.status == 200) {
        console.log('slug action product found');
        dispatch({
          type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
          payload: res.data,
        });
      }
      else {
        console.log('slug action product not found');
  
        dispatch({
          type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
          payload: res.error,
        });
      }
    }catch(error){
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: {error:"no product found"},
      });
    }
     
  };
};
