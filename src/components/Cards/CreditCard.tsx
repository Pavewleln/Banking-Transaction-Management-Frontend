import credit_card from "../../assets/img/credir_card.png"
import {FC} from "react";
import {Currency} from "../../types/Currency";

interface ICreditCard {
    cardDetails?: {
        bank: string,
        numberCard: number,
        authorName: string,
        dateOfCreation: string,
        balance: number,
        currency: Currency.RUB | Currency.USD
    }
}

export const CreditCard: FC<ICreditCard> = ({cardDetails}) => {
    return (
        <>
            <div className={"relative w-64 h-36 m-auto"}>
                {cardDetails
                    ? <>
                        <img alt={"Кредитная карта"} className={"h-full w-full"} src={credit_card}/>
                        <p className={"text-white absolute top-3 left-5 text-xs"}>{cardDetails.authorName}</p>
                        <p className={"text-white absolute top-7 left-5 text-xl"}>{cardDetails.bank}</p>
                        <p className={"text-white absolute inset-x-5 bottom-7 text-base"}>
                            {cardDetails.numberCard.toString().replace(/^(\d{4})(\d{4})(\d{4})(\S+)/g, "$1 $2 $3 $4")}
                        </p>
                        <p className={"text-white absolute inset-x-5 bottom-3 text-xs"}>{cardDetails.dateOfCreation}</p>
                        <p className={"text-white absolute bottom-6 right-5 text-xl"}>MIR</p>
                    </>
                    : <p className={"text-center"}>
                        У вас нет в данный момент карты
                    </p>
                }
            </div>
            {cardDetails &&
                <div className={"flex items-center justify-center"}>
                    {/*<p className={"mb-2 text-xl tracking-tight leading-tight text-gray-900 dark:text-white mt-2 text-center"}>*/}
                    {/*    Баланс:*/}
                    {/*</p>*/}
                    <p className="mb-2 text-xl tracking-tight font-medium leading-tight text-gray-900 dark:text-white mt-2">
                        {cardDetails.balance}
                        {"   "}
                        {cardDetails.currency}
                    </p>
                </div>
            }
        </>
    )
}