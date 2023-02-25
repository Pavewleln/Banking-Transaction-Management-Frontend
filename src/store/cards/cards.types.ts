import {Banks} from "../../types/banks";

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

export interface ITransactions {
    _id: string,
    recipient: string,
    date: string,
    card: string,
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

export interface ITranslationHistoryTable {
    transactions: Array<{
        _id: string,
        recipient: string,
        date: string,
        card: string,
        sum: number
    }>
}