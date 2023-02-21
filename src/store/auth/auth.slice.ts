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
    entities?: {
        _id: string,
        token?: string,
        name: string,
        surname: string,
        phone: string,
        password: string,
        cards?: ICard[]
    }
}

const initialState: IAuthState = {
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