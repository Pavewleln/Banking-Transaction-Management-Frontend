import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ISignInForm, ISignUpForm} from "../../types/auth";
import {IAuth, IAuthResponseLoginRegister, Token} from "./auth.types";

export const AuthApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/auth/',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem(Token.JWT)

            if (token) {
                headers.set('authorization', token)
            }
            return headers
        }
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        register: build.mutation<string | null, ISignUpForm>({
            query: (data: ISignUpForm) => ({
                url: 'register',
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        login: build.mutation<string | null, ISignInForm>({
            query: (data: ISignInForm) => ({
                url: `login`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        getMe: build.query<IAuth | null, void>({
            query: () => 'me'
        })
    })
})

export const {useRegisterMutation, useLoginMutation, useGetMeQuery} = AuthApi