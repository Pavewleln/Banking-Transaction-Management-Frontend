import {IAddHistoryTransfer, IHistory, ITransactions} from "./history.types";
import {api} from "../global.api";

export const HistoryApi = api.injectEndpoints({
    endpoints: build => ({
        getAllMyHistories: build.query<ITransactions[], void>({
            query: () => 'history/all',
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
                url: `history/card/${cardNumber}`
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
                url: `history/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'History', id: 'LIST'}]
        })
    })
})

export const {useGetHistoryOneCardQuery, useAddHistoryTransferMutation, useGetAllMyHistoriesQuery} = HistoryApi