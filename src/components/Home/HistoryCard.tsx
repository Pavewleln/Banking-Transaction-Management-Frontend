import {TranslationHistoryTable} from "./TranslationHistoryTable";
import {useGetHistoryOneCardQuery} from "../../store/history/history.api";
import {PieChartSum} from "../../utils/PieChartSum";
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';
import {HistoryCardSkeleton} from "../Skeletons/HistoryCardSkeleton";

export const HistoryCard = ({cardNumber}: { cardNumber: string }) => {

    const {
        data: transactions,
        isLoading: isGetHistoryOneCardLoading
    } = useGetHistoryOneCardQuery(cardNumber, {
        skip: cardNumber === undefined
    })
    const UserData = PieChartSum({transactions})
    return isGetHistoryOneCardLoading ? <HistoryCardSkeleton/> : (
        <div className={"bg-gray-100 rounded-xl m-2 p-2 max-w-full w-full dark:bg-gray-700"}>
            {transactions && transactions.length >= 1
                ? <div className={"w-full max-h-full flex justify-around items-center flex-col xl:flex-row"}>
                    {/*График*/}
                    {UserData
                        ? <Pie className={"max-w-sm dark:text-white h-auto"} data={{
                            labels: UserData.map((data) => data.action),
                            datasets: [
                                {
                                    label: "Сумма",
                                    data: UserData.map((data) => data.sum),
                                    backgroundColor: [
                                        "rgba(75,192,192,1)",
                                        "#ecf0f1",
                                        "#50AF95",
                                        "#f3ba2f",
                                        "#2a71d0",
                                    ],
                                    borderColor: "black",
                                    borderWidth: 2
                                },
                            ]
                        }}/>
                        : null}
                    {/*История карты*/}
                    <TranslationHistoryTable cardNumber={cardNumber} transactions={transactions}/>
                </div>
                : <p className={"text-center"}>
                    У вас нет никаких активностей
                </p>
            }
        </div>
    )
}