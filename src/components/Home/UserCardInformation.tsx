import {CreditCard} from "../Cards/CreditCard";
import {ChangeEvent, useEffect, useState} from "react";
import {TransferForm} from "../Forms/TransferForm";
import {ButtonForm} from "../Forms/ButtonForm";
import {useNavigate} from "react-router-dom";
import {useGetAllMyCardsQuery, useGetOneCardQuery} from "../../store/cards/cards.api";
import {CreditCardSkeleton} from "../Skeletons/CreditCardSkeleton";
import {UpdateNumberCard} from "../../utils/UpdateNumberCard";
import {useWallet} from "../../hooks/useWallet";

export const UserCardInformation = () => {
    const navigate = useNavigate()
    const {setCardNumber} = useWallet()
    const {data: cards, isSuccess: isGetAllMyCardsNumberSuccess} = useGetAllMyCardsQuery()
    let numbers: string[] = []
    const [numberCardOne, setNumberCardOne] = useState(numbers[0]);
    const {
        data: cardDetails,
        isLoading: getOneCardLoading,
    } = useGetOneCardQuery(numberCardOne, {
        skip: !cards || !numberCardOne
    })
    useEffect(() => {
        setNumberCardOne(numbers[0])
        setCardNumber(numbers[0])
    }, [isGetAllMyCardsNumberSuccess])

    if (cards) {
        numbers = cards.map((card) => card?.numberCard)
    }

    const changeCardSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setNumberCardOne(e.target.value.replace(/ /g, ''))
        setCardNumber(e.target.value.replace(/ /g, ''))
    }
    return getOneCardLoading ? <CreditCardSkeleton/> : (
        <div
            className={"bg-gray-100 w-full max-w-full sm:max-w-sm rounded-xl p-2 m-2 relative dark:bg-gray-700"}>
            {/*Создать карту*/}
            <svg onClick={() => navigate('/cards/create')} xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor"
                 className="w-6 h-6 absolute top-5 right-5 hover:stroke-blue-500 transition-all cursor-pointer dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {cardDetails
                ? <>
                    <div className={"cursor-pointer"} onClick={() => navigate(`/cards/info/${cardDetails.numberCard}`)}>
                        <CreditCard cardDetails={cardDetails}/>
                    </div>
                    <div className={"w-64 m-auto"}>
                        {numbers
                        && numbers.length === 1
                            ? null
                            : <select
                                onChange={changeCardSelect}
                                id="large"
                                className="block w-full px-4 py-3 my-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {numbers.map((c) => (
                                    <option value={c} key={c}>{UpdateNumberCard(c)}</option>
                                ))}
                            </select>
                        }
                        <details className="rounded-lg my-2">
                            <summary
                                className="cursor-pointer w-full p-2 font-medium text-left text-gray-900 rounded-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline">
                                Перевести
                            </summary>
                            <TransferForm cardDetails={cardDetails}/>
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