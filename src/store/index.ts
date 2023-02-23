import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./auth/auth.slice";
import {AuthApi} from "./auth/auth.api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const index = configureStore({
    reducer: {
        auth: authReducer,
        [AuthApi.reducerPath]: AuthApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
})

setupListeners(index.dispatch)

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector