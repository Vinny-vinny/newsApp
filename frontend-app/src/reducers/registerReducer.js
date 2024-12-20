import {createSlice} from "@reduxjs/toolkit";
import api from "../utils/api";

export const registerReducer = createSlice({
    name: "register",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        registerStart: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const {registerStart, registerSuccess, registerFailure} = registerReducer.actions;

export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerStart());
    try {
        const response = await api.post("/auth/register", userData);
        dispatch(registerSuccess());
        return response.data;
    } catch (error) {
        dispatch(registerFailure(error.response?.data || "Registration failed"));
    }
};

export default registerReducer.reducer;
