import credit_card from "../../assets/img/credir_card.png"
import {FC} from "react";
import {UpdateNumberCard} from "../../utils/UpdateNumberCard";
import {ICreditCard} from "../../store/cards/cards.types";

export const CreditCard: FC<ICreditCard> = ({cardDetails}) => {
    return (
        <>
            <div className={"relative w-64 h-36 m-auto"}>
                <img alt={"Кредитная карта"} className={"h-full w-full"} src={credit_card}/>
                <p className={"text-white absolute top-3 left-5 text-xs"}>{cardDetails.owner}</p>
                <p className={"text-white absolute top-7 left-5 text-xl"}>{cardDetails.bankName}</p>
                <p className={"text-white absolute inset-x-5 bottom-7 text-base"}>
                    {UpdateNumberCard(cardDetails.numberCard)}
                </p>
                <p className={"text-white absolute inset-x-5 bottom-3 text-xs"}>{cardDetails.dateOfCreation}</p>
                <p className={"text-white absolute bottom-6 right-5 text-xl"}>MIR</p>

            </div>
            <div className={"flex items-center justify-center"}>
                <p className="mb-2 text-xl tracking-tight font-medium leading-tight text-gray-900 dark:text-white mt-2">
                    {cardDetails.balance.toFixed(2)}
                    {"   "}
                    {cardDetails.currency}
                </p>
            </div>
        </>
    )
}