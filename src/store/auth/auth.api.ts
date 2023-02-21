import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({

    })
})

const {} = AuthApi