import {createApi, fetchBaseQuery, skipToken} from "@reduxjs/toolkit/query/react";
import {RootState} from "../index";
import {IAuth, IAuthResponseLoginRegister, ISignInForm, ISignUpForm, IUpdateProfile, IUploadAvatar} from "./auth.types";
import {BASE_URL} from "../../types/baseUrl";

export const AuthApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}auth/`,
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
        getMe: build.query<IAuth, any>({
            query: () => 'me',
        }),
        updateProfile: build.mutation<IAuth, IUpdateProfile>({
            query: (data) => ({
                url: 'update',
                method: 'PATCH',
                body: data
            })
        }),
        uploadAvatar: build.mutation<any, any>({
            query: (data) => ({
                url: "upload",
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useRegisterMutation, useLoginMutation, useGetMeQuery, useUpdateProfileMutation, useUploadAvatarMutation} = AuthApi