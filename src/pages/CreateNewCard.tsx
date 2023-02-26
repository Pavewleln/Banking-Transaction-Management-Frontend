import {TypeCard} from "../store/cards/cards.types"
import {Banks} from "../types/banks"
import {ButtonForm} from "../Common/Forms/ButtonForm";
import {useEffect, useState} from "react";
import {useCreateCardMutation} from "../store/cards/cards.api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const CreateNewCard = () => {
    const navigate = useNavigate()
    const [createCard, {
        isSuccess: isCreateCardSuccess,
        isLoading: isCreateCardLoading,
        isError: isCreateCardError,
        error: createCardError
    }] = useCreateCardMutation()
    const [typeCard, setTypeCard] = useState<string>(TypeCard.debit)
    const [currency, setCurrency] = useState<string>(Banks.RUB)
    // Если успешно
    useEffect(() => {
        if (isCreateCardSuccess) {
            navigate('/home')
            toast.success("Карта успешно создана!")
        }
    }, [isCreateCardSuccess])

    // Если ошибка
    useEffect(() => {
        if (isCreateCardError) {
            toast.error((createCardError as any).data.message)
        }
    }, [isCreateCardError])

    const handleSubmit = async () => {
        console.log(currency, typeCard)
        await createCard({currency, typeCard})
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <select
                    id="typeCard"
                    onChange={(e) => setTypeCard(e.target.value)}
                    className="m-auto max-w-[300px] mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value={TypeCard.credit}>Кредитная</option>
                    <option value={TypeCard.debit}>Дебетовая</option>
                </select>
                <select
                    id="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                    className="m-auto max-w-[300px] mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value={Banks.RUB}>RUB</option>
                    <option value={Banks.USD}>USD</option>
                </select>
                <ButtonForm isLoading={isCreateCardLoading} submit={handleSubmit} label={"Открыть карту"}/>
                <p className={"text-red-800 mt-2 m-auto text-center"}>*В будущем изменить карту будет невозможно</p>
            </div>
        </div>
    )
}