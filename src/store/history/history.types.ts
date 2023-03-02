import {Banks} from "../../types/banks";

export enum TypeCard {
    receiving = "Получения",
    transfer = "Переводы",
    account = "Счета",
    credit = "Кредит"
}

export interface ITranslationHistoryTable {
    transactions: ITransactions[],
    cardNumber?: string
}

export interface ITransactions {
    recipient: string,
    date: string,
    sum: number,
    card: string,
    currency: Banks.RUB | Banks.USD,
    numberCardUser: string,
    user: string,
    moneyType: TypeCard.account | TypeCard.receiving | TypeCard.credit | TypeCard.transfer
    _id: string,
    currencyRecipient: Banks.RUB | Banks.USD,
    createdAt: string,
    updatedAt: string,
    __v: number
}
export interface IAddHistoryTransfer {
    sum: number,
    recipient: string,
    card: string,
    numberCardUser: string,
    currency: Banks.RUB | Banks.USD,
    moneyType: TypeCard.account | TypeCard.receiving | TypeCard.credit | TypeCard.transfer
}
export interface IHistory {
    recipient: string,
    date: string,
    sum: number,
    card: string,
    currency: Banks.RUB | Banks.USD,
    numberCardUser: string,
    user: string,
    moneyType: TypeCard.account | TypeCard.receiving | TypeCard.credit | TypeCard.transfer
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}