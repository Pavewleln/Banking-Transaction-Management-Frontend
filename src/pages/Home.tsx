import {UserCardInformation} from "../components/Home/UserCardInformation";
import PieChart from "../components/Home/PieChart";
import {TranslationHistoryTable} from "../components/Home/TranslationHistoryTable";
import {ITransactions, IUserDataPie} from "../store/cards/cards.types";

export const UserData: IUserDataPie[] = [
    // сколько перечислил
    // сколько получил
    // сколько на счету
    // сколько взято в кредит
    {
        id: 1,
        action: "Перечисления",
        sum: 20000
    },
    {
        id: 2,
        action: "Получения",
        sum: 10000
    },
    {
        id: 3,
        action: "Счета",
        sum: 90000
    },
    {
        id: 4,
        action: "В кредит",
        sum: 1000000
    },

];

export const Home = () => {
    const transactions: ITransactions[] = [
        {
            _id: "sabkvjbdv",
            recipient: "Иван Куликов",
            date: "20.04.05",
            card: "7845678856785678",
            sum: -2020
        }
    ]
    return (
        <div className={"p-4"}>
            <div className={"flex justify-between flex-col-reverse sm:flex-row"}>
                <div className={"bg-gray-100 rounded-xl m-2 p-2 max-w-full w-full"}>
                    {transactions.length >= 1
                        ? <div className={"w-full max-h-full flex justify-around items-center flex-col xl:flex-row"}>
                            {/*График*/}
                            <PieChart/>
                            {/*История карты*/}
                            <TranslationHistoryTable transactions={transactions}/>
                        </div>
                        : <p className={"text-center"}>
                            У вас нет никаких активностей
                        </p>
                    }
                </div>
                {/*Карта*/}
                <UserCardInformation/>
            </div>
        </div>
    )
}