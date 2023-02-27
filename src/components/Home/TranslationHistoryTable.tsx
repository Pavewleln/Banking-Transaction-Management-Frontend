import {FC} from "react";
import { ITranslationHistoryTable } from "../../store/history/history.types";
import {UpdateNumberCard} from "../../utils/updateNumberCard";

export const TranslationHistoryTable: FC<ITranslationHistoryTable> = ({transactions, cardNumber}) => {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="overflow-y-auto w-full max-w-xl shadow-md rounded-lg max-h-80 mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr className={"text-center"}>
                    <th scope="col" className="px-6 py-3">
                        Дата
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Карта
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Сумма
                    </th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(transact => (
                    <tr key={transact._id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">
                            {transact.date}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {UpdateNumberCard(transact.card)}
                        </td>
                        <td className={classNames(transact.sum < 0 ? "text-red-600" : "text-green-600", "px-6 py-4")}>
                            {transact.sum}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}