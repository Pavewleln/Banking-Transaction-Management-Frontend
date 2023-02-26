import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./auth/auth.slice";
import {AuthApi} from "./auth/auth.api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import cardsReducer from "./cards/cards.slice";
import {CardsApi} from "./cards/cards.api";
import {HistoryApi} from "./history/history.api";

export const index = configureStore({
    reducer: {
        auth: authReducer,
        cards: cardsReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [CardsApi.reducerPath]: CardsApi.reducer,
        [HistoryApi.reducerPath]: HistoryApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware, CardsApi.middleware, HistoryApi.middleware),
    devTools: process.env.NODE_ENV !== "production"
})

setupListeners(index.dispatch)

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector