import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../reducers/authReducer";
import registerReducer from "../reducers/registerReducer";
import newsReducer from "../reducers/newsReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        news: newsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
