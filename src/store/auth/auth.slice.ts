import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth, Token} from "./auth.types";
import {RootState} from "../index";
import {AuthApi} from "./auth.api";

interface IAuthState {
    token: string | null,
    entities: IAuth | null
}

const initialState: IAuthState = {
    token: localStorage.getItem(Token.JWT) ?? null,
    entities: null
}

// export const fetchAuthData = createAsyncThunk<IAuth | undefined>('auth/getMe', async () => {
//     try {
//         const response = await useGetMeQuery()
//         console.log(response)
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// })

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ token: string }>) => {
            localStorage.setItem(Token.JWT, JSON.stringify(action.payload.token))
            state.token = action.payload.token
        },
        logout: (state) => {
            state.token = null
            state.entities = null
            localStorage.removeItem(Token.JWT)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(AuthApi.endpoints.getMe.matchFulfilled, (state, {payload}) => {
            state.entities = payload
        });
        builder.addMatcher(AuthApi.endpoints.updateProfile.matchFulfilled, (state, {payload}) => {
            state.entities = payload
        });
    }
})
const {reducer: authReducer, actions} = AuthSlice;

export const selectAuth = () => (state: RootState) => state.auth.entities;
export const getIsToken = () => (state: RootState) => state.auth.token;

export const {setToken, logout} = actions

export default authReducer