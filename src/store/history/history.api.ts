import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../types/baseUrl";
import {RootState} from "../index";
import {IAddHistoryTransfer, IHistory, ITransactions} from "./history.types";

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
        getAllMyHistories: build.query<ITransactions[], void>({
            query: () => 'all',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({_id}) => ({type: 'History' as const, _id})),
                        {type: 'History', id: 'LIST'},
                    ]
                    : [{type: 'History', id: 'LIST'}]
        }),
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
        addHistoryTransfer: build.mutation<IHistory, IAddHistoryTransfer>({
            query: (data) => ({
                url: ``,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'History', id: 'LIST'}]
        })
    })
})

export const {useGetHistoryOneCardQuery, useAddHistoryTransferMutation, useGetAllMyHistoriesQuery} = HistoryApi