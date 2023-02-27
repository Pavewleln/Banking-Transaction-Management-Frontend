import {ITransactions} from "../store/history/history.types";
import {IUserDataPie} from "../store/cards/cards.types";

export const PieChartSum = ({transactions}: { transactions: ITransactions[] | undefined }) => {
    if (transactions && transactions.length > 0) {
        const reduceSum = (type: string) => {
            return transactions.map((transact) => {
                return transact.moneyType === type ? transact.sum : 0
            }).reduce((acc, next) => acc + next)
        }
        const UserData: IUserDataPie[] = [
            // сколько перечислил
            // сколько получил
            // сколько на счету
            // сколько взято в кредит
            {
                id: 1,
                action: "Переводы",
                sum: reduceSum("Переводы")
            },
            {
                id: 2,
                action: "Получения",
                sum: reduceSum("Получения")
            },
            {
                id: 3,
                action: "Счета",
                sum: reduceSum("Счета")
            },
            {
                id: 4,
                action: "Кредит",
                sum: reduceSum("Кредит")
            }

        ];
        console.log(UserData)
        return UserData
    }
}