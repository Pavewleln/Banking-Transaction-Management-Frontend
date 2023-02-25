import {CreditCard} from "../Cards/CreditCard";
import {ChangeEvent, useEffect, useState} from "react";
import {TransferForm} from "../../Common/Forms/TransferForm";
import {ButtonForm} from "../../Common/Forms/ButtonForm";
import {useNavigate} from "react-router-dom";
import {useGetAllMyCardsNumberQuery, useGetOneCardQuery} from "../../store/cards/cards.api";
import {CreditCardSkeleton} from "../Skeletons/CreditCardSkeleton";
import {UpdateNumberCard} from "../../utils/updateNumberCard";

export const UserCardInformation = () => {
    const {data: numbers, isSuccess: isGetAllMyCardsNumberSuccess} = useGetAllMyCardsNumberQuery()
    const cardsNumberAll: string[] | undefined = numbers || []
    useEffect(() => {
        if (numbers) {
            setNumberCardOne(numbers[0])
        }
    }, [isGetAllMyCardsNumberSuccess])
    const [numberCardOne, setNumberCardOne] = useState(cardsNumberAll[0]);
    const {data: cardDetails, isLoading: getOneCardLoading} = useGetOneCardQuery(numberCardOne)
    const navigate = useNavigate()

    const changeCardSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setNumberCardOne(e.target.value.replace(/ /g, ''))
    }
    return getOneCardLoading ? <CreditCardSkeleton/> : (
        <div
            className={"bg-gray-100 w-full max-w-full sm:max-w-sm rounded-xl p-2 m-2 relative"}>
            {/*Создать карту*/}
            <svg onClick={() => navigate('/cards/create')} xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor"
                 className="w-6 h-6 absolute top-5 right-5 hover:stroke-blue-500 transition-all cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {cardDetails
                ? <>
                    <CreditCard cardDetails={cardDetails}/>
                    <div className={"w-64 m-auto"}>
                        {cardsNumberAll
                            && cardsNumberAll.length === 1
                                ? cardsNumberAll.map((c) => (<div key={c}>{UpdateNumberCard(c)}</div>))
                                : <select
                                    value={numberCardOne}
                                    onChange={changeCardSelect}
                                    id="large"
                                    className="block w-full px-4 py-3 my-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    {cardsNumberAll.map((c) => (
                                        <option key={c}>{UpdateNumberCard(c)}</option>
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
                </>
                : <div className={"text-center"}>
                    <h2>У вас нет карты :(</h2>
                    <div onClick={() => navigate('/cards/create')} className={"w-52 m-auto max-h-full mt-5"}>
                        <ButtonForm label={"Открыть карту"}/>
                    </div>
                </div>
            }
        </div>
    )
}