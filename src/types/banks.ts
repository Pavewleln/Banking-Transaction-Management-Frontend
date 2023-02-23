export enum Banks {
    USD = "$",
    RUB = "₽"
}

interface ICard {
    cardDetails: {
        bank: string,
        numberCard: number,
        authorName: string,
        dateOfCreation: string,
        balance: number,
        currency: Banks.RUB | Banks.USD
    }
}