import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./auth/auth.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import cardsReducer from "./cards/cards.slice";
import {api} from "./global.api";

export const index = configureStore({
    reducer: {
        auth: authReducer,
        cards: cardsReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production"
})

setupListeners(index.dispatch)

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector