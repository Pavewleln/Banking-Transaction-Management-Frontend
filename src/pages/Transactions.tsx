import {useGetAllMyHistoriesQuery} from "../store/history/history.api"
import {useEffect} from "react";
import {toast} from "react-toastify";
import {TranslationHistoryTable} from "../components/Home/TranslationHistoryTable";
import {PieChartSum} from "../utils/PieChartSum";
import {Pie} from "react-chartjs-2";
import {HistoryCardSkeleton} from "../components/Skeletons/HistoryCardSkeleton";

export const Transactions = () => {
    const {
        data: transactions,
        isError: isGetAllMyHistoriesError,
        error: getAllMyHistoriesError,
        isLoading: isGetAllMyHistoriesLoading
    } = useGetAllMyHistoriesQuery()

    // Если ошибка
    useEffect(() => {
        if (isGetAllMyHistoriesError) {
            toast.error((getAllMyHistoriesError as any).data.message)
        }
    }, [isGetAllMyHistoriesError])

    const UserData = PieChartSum({transactions})
    return !isGetAllMyHistoriesLoading ? (
        <main className={"h-screen dark:bg-gray-700"}>
            <div className={"bg-gray-100 rounded-xl p-2 dark:bg-gray-700"}>
                {transactions && transactions.length > 0
                    ? <div className={"px-1"}>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white text-center">Общая
                            история</h1>
                        <div className={"w-full max-h-full flex justify-around items-center flex-col xl:flex-row"}>
                            {UserData
                                ? <div>
                                    <Pie className={"dark:text-white h-auto w-full"} data={{
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
                                </div>
                                : null}
                            <TranslationHistoryTable transactions={transactions}/>
                        </div>
                    </div>
                    : <div>
                        <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white text-center m-auto h-screen">
                            У вас нет истории:(
                        </h1>
                    </div>
                }
            </div>
        </main>
    ) : <HistoryCardSkeleton/>
}