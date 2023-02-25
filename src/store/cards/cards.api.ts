import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../types/baseUrl";
import {RootState} from "../index";
import {ICreditCard, ICreditCardOut} from "./cards.types";

export const CardsApi = createApi({
    reducerPath: 'cards/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}cards/`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token.replace(/"/g, '')}`)
            }

            return headers
        }
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        getAllMyCards: build.query<ICreditCardOut[], void>({
            query: () => 'all'
        }),
        getOneCard: build.query<ICreditCardOut, string>({
            query: (numberCardOne) => ({
                url: `${numberCardOne}`
            })
        }),
        getAllMyCardsNumber: build.query<string[] | undefined, void>({
            query: () => 'all/numbers'
        })
    })
})
export const {useGetAllMyCardsQuery, useGetOneCardQuery, useGetAllMyCardsNumberQuery} = CardsApi