import { api } from "../global.api";
import {ICreateCard, ICreditCardOut, ITransferOnCard} from "./cards.types";

export const CardsApi = api.injectEndpoints({
    endpoints: build => ({
        getAllMyCards: build.query<ICreditCardOut[], void>({
            query: () => 'cards/all',
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
                url: `cards/${numberCardOne}`
            }),
            providesTags: () => [{type: 'Cards', id: 'LIST'}]
        }),
        getAllMyCardsNumber: build.query<string[] | undefined, void>({
            query: () => 'all/numbers'
        }),
        createCard: build.mutation<ICreateCard, any>({
            query: (data) => ({
                url: 'cards/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        transferOnCard: build.mutation<ICreditCardOut, ITransferOnCard>({
            query: (data) => ({
                url: 'cards/transfer',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        deleteCard: build.mutation<any, string | undefined>({
            query: (cardId) => ({
                url: `cards/${cardId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Cards', id: 'LIST'}]
        }),
        searchCardByFullName: build.mutation<ICreditCardOut[], string>({
            query: (fullname: string) => ({
                url: `cards/search`,
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