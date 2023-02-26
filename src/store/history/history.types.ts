export interface ITranslationHistoryTable {
    transactions: ITransactions[],
    cardNumber: string
}

export interface ITransactions {
    _id: string,
    recipient: string,
    date: string,
    sum: number,
    card: string,
    currency: string,
    numberUserCard: string,
    moneyType: string
}