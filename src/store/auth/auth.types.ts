export enum Token {
    JWT = 'jwt-token'
}

export interface IAuthResponseLoginRegister {
    token: string
}

export interface IAuth {
    _id: string,
    fullname: string,
    email: string,
    password: string,
    avatarUrl: string | undefined
}

export interface ISignUpForm {
    fullname: string,
    email: string,
    password: string
}

export interface ISignInForm {
    email: string;
    password: string;
}

export interface IUpdateProfile {
    fullname: string,
    avatarUrl: string | undefined
}
export interface IUploadAvatar {
    avatarUrl: string | undefined
}