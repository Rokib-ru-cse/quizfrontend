import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    value: AuthState
}

const initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: 0,
        isAdmin: false
    } as AuthState
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
})