import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../types/baseUrl";
import {RootState} from "../index";
import {ICreateCard, ICreditCardOut, ITransferOnCard} from "./cards.types";

export const CardsApi = createApi({
    reducerPath: 'cards/api',
    tagTypes: ['Cards'],
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
            query: () => 'all',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({_id}) => ({type: 'Cards' as const, _id})),
                        {type: 'Cards', id: 'LIST'},
                    ]
                    : [{type: 'Cards', id: 'LIST'}]
        }),
        getOneCard: build.query<ICreditCardOut, any>({
            query: (numberCardOne) => ({
                url: `${numberCardOne}`
            }),
            providesTags: () => [{type: 'Cards', id: 'LIST'}]
        }),
        getAllMyCardsNumber: build.query<string[] | undefined, void>({
            query: () => 'all/numbers'
        }),
        createCard: build.mutation<ICreateCard, any>({
            query: (data) => ({
                url: 'create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        transferOnCard: build.mutation<ICreditCardOut, ITransferOnCard>({
            query: (data) => ({
                url: 'transfer',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        deleteCard: build.mutation<any, string | undefined>({
            query: (cardId) => ({
                url: `${cardId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        searchCardByFullName: build.mutation<ICreditCardOut[], string>({
            query: (fullname: string) => ({
                url: `search`,
                method: 'POST',
                params: {
                    fullname: fullname.toString()
                }
            })
        })
    })
})
export const {
    useGetAllMyCardsQuery,
    useGetOneCardQuery,
    useCreateCardMutation,
    useTransferOnCardMutation,
    useDeleteCardMutation,
    useSearchCardByFullNameMutation
} = CardsApi