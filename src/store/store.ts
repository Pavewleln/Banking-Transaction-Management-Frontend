import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./auth/auth.slice";
import {AuthApi} from "./auth/auth.api";

const rootReducer = combineReducers({auth: authReducer})
export const store = configureStore({
    reducer: {
        rootReducer,
        [AuthApi.reducerPath]: AuthApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>; //Получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch; //Получаем типизацию store.dispatch