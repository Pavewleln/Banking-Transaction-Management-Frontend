import {IAuth, IAuthResponseLoginRegister, ISignInForm, ISignUpForm, IUpdateProfile} from "./auth.types";
import {api} from "../global.api";

export const AuthApi = api.injectEndpoints({
    endpoints: build => ({
        register: build.mutation<string, ISignUpForm>({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        login: build.mutation<string, ISignInForm>({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response: IAuthResponseLoginRegister) => response.token
        }),
        getMe: build.query<IAuth, any>({
            query: () => 'auth/me',
        }),
        updateProfile: build.mutation<IAuth, IUpdateProfile>({
            query: (data) => ({
                url: 'auth/update',
                method: 'PATCH',
                body: data
            })
        }),
        uploadAvatar: build.mutation<any, any>({
            query: (data) => ({
                url: "auth/upload",
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation
} = AuthApi