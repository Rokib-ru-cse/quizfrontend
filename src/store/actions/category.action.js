import axios from "../../helpers/axios";
import { categoryConstants } from "./actionConstants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_CATEGORY_REQUEST,
    });
    const res = await axios.get("/categories");
    if (res.status == 200) {
      // const {categoryList} = res.data
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: {
          categories: res.data.categories,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
