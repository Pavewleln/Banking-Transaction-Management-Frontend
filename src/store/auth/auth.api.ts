import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ISignInForm, ISignUpForm} from "../../types/auth";
import {RootState} from "../store";
import {IAuth, IAuthResponseLoginRegister} from "./auth.types";

export const AuthApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/auth/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).rootReducer.auth.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        register: build.mutation<string, ISignUpForm>({
            query: (data: ISignUpForm) => ({
                url: 'register',
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        login: build.mutation<string, ISignInForm>({
            query: (data: ISignInForm) => ({
                url: `login`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        getMe: build.query<IAuth, undefined>({
            query: () => ({
                url: 'me',
                method: 'GET'
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation} = AuthApi