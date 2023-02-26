import {Banks} from "../../types/banks";

export enum TypeCard {
    credit = "Кредитная",
    debit = "Дебетовая"
}

export interface ICard {
    bank: string,
    numberCard: string,
    authorName: string,
    dateOfCreation: string,
    balance: number,
    currency: Banks.RUB | Banks.USD
}

export interface IUserDataPie {
    id: string | number,
    action: string,
    sum: number
}

export interface ICreditCard {
    cardDetails: {
        code: number
        createdAt: string
        typeCard: string
        updatedAt: string
        user: string
        __v: number
        _id: string
        bankName: string,
        numberCard: string,
        owner: string,
        dateOfCreation: string,
        balance: number,
        currency: Banks.RUB | Banks.USD
    }
}

export interface ICreditCardOut {
    code: number
    createdAt: string
    typeCard: string
    updatedAt: string
    user: string
    __v: number
    _id: string
    bankName: string,
    numberCard: string,
    owner: string,
    dateOfCreation: string,
    balance: number,
    currency: Banks.RUB | Banks.USD
}

export interface ICreateCard {
    currency: Banks.RUB | Banks.USD,
    typeCard: TypeCard.debit | TypeCard.credit
}