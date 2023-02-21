import {UserCardInformation} from "../components/Home/UserCardInformation";
import PieChart from "../components/Home/PieChart";
import {TranslationHistoryTable} from "../components/Home/TranslationHistoryTable";

export const UserData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823,
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345,
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555,
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555,
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234,
    },
];

export const Home = () => {
    const transactions = [
        {
            _id: "sabkvjbdv",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "2",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "3",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "4",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "5",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "6",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "7",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "345",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "sdv",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "23",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        },
        {
            _id: "8",
            recipient: "Иван Куликов",
            date: "20.04.05",
            phone: "89206311138",
            sum: 2020
        }
    ]
    return (
        <div className={"p-4"}>
            <div className={"flex justify-between flex-col sm:flex-row"}>
                <div className={"bg-gray-100 rounded-xl m-2 p-2 max-w-full w-full"}>
                    {transactions
                        ? <div className={"w-full max-h-full flex justify-around items-center flex-col xl:flex-row"}>
                            <PieChart/>
                            <TranslationHistoryTable transactions={transactions}/>
                        </div>
                        : <p className={"text-center"}>
                            У вас нет никаких активностей
                        </p>
                    }
                </div>
                <UserCardInformation/>
            </div>
        </div>
    )
}