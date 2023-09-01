import axios from "../../helpers/axios";
// import { API } from "../../urlConfig";
import { authConstants, cartConstants } from "./actionConstants";

export const login = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
        });
        const res = await axios.post(`/signin/`, {
            ...user,
        });
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: res.data.error,
                },
            });
        }
    };
};

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: "failed to login",
                },
            });
        }
    };
};

export const userLogOut = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST,
        });
        localStorage.clear()
        // localStorage.removeItem('user')
        // localStorage.removeItem('token')
        dispatch({
            type: authConstants.LOGOUT_SUCCESS,
        });
        dispatch({
            type: cartConstants.RESET_CART
        })
        // const res = await axios.post(`/signout`);
        // if (res.status == 200) {
        //     localStorage.clear();
        //     dispatch({
        //         type: authConstants.LOGOUT_SUCCESS,
        //     });
        // } 
        // else {
        //     dispatch({
        //         type: authConstants.LOGOUT_FAILURE,
        //         payload: {
        //             error: res.data.error
        //         }
        //     });
    }
};


export const signup = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.SIGNUP_REQUEST,
        });
        const res = await axios.post(`/signup/`, {
            ...user,
        });
        if (res.status === 201) {
            const { message } = res.data.user;

            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: {
                    message,
                },
            });
            const {token,user} = res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token,
                    user
                }
            })
        
        } else {
            dispatch({
                type: authConstants.SIGNUP_FAILURE,
                payload: {
                    error: res.data.error,
                },
            });
        }
    };
};