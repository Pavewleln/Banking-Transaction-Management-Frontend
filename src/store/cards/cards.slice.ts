import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

export const CardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {}
})

const {reducer: cardsReducer, actions} = CardsSlice;

export const {} = actions

export default cardsReducer