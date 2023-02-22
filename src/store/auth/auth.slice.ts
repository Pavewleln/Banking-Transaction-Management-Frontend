import {createSlice} from "@reduxjs/toolkit";
import {Currency} from "../../types/currency";

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
    entities?: {
        _id: string,
        fullname: string,
        email: string,
        password: string
    }
}

const initialState: IAuthState = {
    token: window.localStorage.getItem('jwt-token'),
    entities: undefined
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

const {reducer: authReducer, actions} = AuthSlice;
const {} = actions

export default authReducer