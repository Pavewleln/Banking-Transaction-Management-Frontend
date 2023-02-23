import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../index";
import {IAuth, IAuthResponseLoginRegister, ISignInForm, ISignUpForm} from "./auth.types";

export const AuthApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/auth/',
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
        register: build.mutation<string, ISignUpForm>({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        login: build.mutation<string, ISignInForm>({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        getMe: build.query<IAuth, void>({
            query: () => 'me',
        })
    })
})

export const {useRegisterMutation, useLoginMutation, useGetMeQuery} = AuthApi