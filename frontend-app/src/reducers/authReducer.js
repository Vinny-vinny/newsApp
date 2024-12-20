import {createSlice} from "@reduxjs/toolkit";
import api from "../utils/api";


export const authReducer = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        checkLoginStatus: (state) => {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (user && token) {
                state.loggedIn = true;
                state.user = JSON.parse(user);
                state.token = JSON.parse(token);
                state.loading = false;
                state.error = null
            }
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null
            alert(JSON.stringify(action.payload))
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('ACCESS_TOKEN', JSON.stringify(action.payload.token))
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logoutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.loggedIn = false;
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('ACCESS_TOKEN');
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});


export const {
    checkLoginStatus,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure
} = authReducer.actions;


export const loginUser = (credentials) => async (dispatch) => {
    console.log('login statrt ')
    dispatch(loginStart());
    try {
        const response = await api.post('/auth/login', credentials);
      //  alert('login success')
        dispatch(loginSuccess(response.data.data));
    } catch (error) {
        alert('error')
        dispatch(loginFailure(error.response.data));
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(logoutStart());
    try {
        await api.post('/auth/logout'); // Assume the API handles session invalidation
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailure(error.response?.data || "Logout failed"));
    }
};


export default authReducer.reducer;