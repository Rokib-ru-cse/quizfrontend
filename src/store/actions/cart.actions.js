import axios from "../../helpers/axios";
import { cartConstants } from "./actionConstants";
import store from "../index";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post(`/getCartItems`);
      console.log('cart action page',res);
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log('cart action page',error);
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
        cartReducer: { cartItems },
      authReducers,
    } = store.getState();
    //const product = action.payload.product;
    //const products = state.products;
    console.log('cart action page action::products', product);

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };
    console.log('cart action page action::products', cartItems);


    if (authReducers.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        cartItems: [
          {
            product: product._id,
            quantity: qty,
            // price:product.price
          },
        ],
      };
      const res = await axios.post(`/carts`, payload);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    console.log("cart action page addToCart::", cartItems);

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
    
  }
};
  
export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`removeCartItem`,  {payload} );
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        }); 
      }
    } catch (error) {
      console.log('cart action page',error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { authReducers } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    console.log("cart action page",cartItems);

    if (authReducers.authenticate) {
      localStorage.removeItem("cart");
      dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
              // price:cartItems[key].price
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post(`/carts`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export { getCartItems }