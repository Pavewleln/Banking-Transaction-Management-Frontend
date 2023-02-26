import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../types/baseUrl";
import {RootState} from "../index";
import { ITransactions } from "./history.types";

export const HistoryApi = createApi({
    reducerPath: 'history/api',
    tagTypes: ['History'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}history/`,
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
        getHistoryOneCard: build.query<ITransactions[], any>({
            query: (cardNumber) => ({
                url: `card/${cardNumber}`
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({_id}) => ({type: 'History' as const, _id})),
                        {type: 'History', id: 'LIST'},
                    ]
                    : [{type: 'History', id: 'LIST'}]
        }),
    })
})

export const {useGetHistoryOneCardQuery} = HistoryApi