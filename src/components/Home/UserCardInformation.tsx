import {CreditCard} from "../Cards/CreditCard";
import {TransferForm} from "../Forms/TransferForm";
import {ChangeEvent, useState} from "react";
import {Currency} from "../../types/Currency";

export const UserCardInformation = () => {
    const banks: string[] | undefined = ["Bank1", "Bank2", "Bank3"]
    const [cardName, setCardName] = useState(banks[0]);

    const changeCardSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setCardName(e.target.value);
    }
    const cardDetails = {
        bank: "Тинькофф",
        numberCard: 2022202222256747,
        authorName: "Павел Куликов",
        dateOfCreation: "21/02",
        balance: 2000,
        currency: Currency.RUB
    }
    return (
        <div className={"bg-gray-100 w-full max-w-full sm:max-w-sm rounded-xl p-2 m-2 pt-5"}>
            <CreditCard cardDetails={cardDetails}/>
            <div className={"w-64 m-auto"}>
                {banks.length > 1 &&
                    <select
                        value={cardName}
                        onChange={(e) => changeCardSelect(e)}
                        id="large"
                        className="block w-full px-4 py-3 my-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {banks.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                }
                <details className="rounded-lg my-2">
                    <summary
                        className="cursor-pointer w-full p-2 font-medium text-left text-gray-900 rounded-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline">
                        Перевести
                    </summary>
                    <TransferForm/>
                </details>
            </div>
        </div>
    )
}