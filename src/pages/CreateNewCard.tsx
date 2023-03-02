import {TypeCard} from "../store/cards/cards.types"
import {Banks} from "../types/banks"
import {ButtonForm} from "../components/Forms/ButtonForm";
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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 dark:bg-gray-800">
            <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
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
                <div className={"flex"}>
                    <button onClick={() => navigate(-1)} type="button"
                            className="mr-5 text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                        </svg>
                        Назад
                    </button>
                    <ButtonForm isLoading={isCreateCardLoading} submit={handleSubmit} label={"Открыть карту"}/>
                </div>
                <div
                    className="mt-5 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                    role="alert">
                    <span className="font-medium">*В будущем изменить карту будет невозможно</span>
                </div>
            </div>
        </div>
    )
}