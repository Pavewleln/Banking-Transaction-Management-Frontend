import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Currency} from "../../types/currency";
import {IAuth, Token} from "./auth.types";
import {RootState} from "../store";

interface ICard {
    cardDetails: {
        bank: string,
        numberCard: number,
        authorName: string,
        dateOfCreation: string,
        balance: number,
        currency: Currency.RUB | Currency.USD
    }
}

interface IAuthState {
    token: string | null,
    entities: IAuth | null
}

const initialState: IAuthState = {
    token: localStorage.getItem(Token.JWT) ?? null,
    entities: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ token: string | null }>) => {
            localStorage.setItem(Token.JWT, JSON.stringify(action.payload.token))
            state.token = action.payload.token
        },
        setAuth: (state, action: PayloadAction<{ data: IAuth | null }>) => {
            state.entities = action.payload.data
        },
        logout: (state) => {
            state.token = null
            state.entities = null
            localStorage.removeItem(Token.JWT)
        }
    }
})
export const selectAuth = (state: RootState) => Boolean(state.rootReducer.auth.token)
const {reducer: authReducer, actions} = AuthSlice;
export const {setToken, setAuth, logout} = actions

export default authReducer