export enum Banks {
    USD = "$",
    RUB = "₽"
}
export type GlobalContent = {
    cardNumber: string
    setCardNumber:(cardNumber: string) => void
}