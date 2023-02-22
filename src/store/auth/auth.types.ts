export interface IAuthResponseLoginRegister {
    token: string
}

export interface IAuth {
    _id: string,
    fullname: string,
    email: string,
    password: string
}

export enum Token {
    JWT = 'jwt-token'
}