import {UserCardInformation} from "../components/Home/UserCardInformation";
import {useState} from "react";
import {WalletContext} from "../hooks/useWallet";
import {HistoryCard} from "../components/Home/HistoryCard";

export const Home = () => {
    const [cardNumber, setCardNumber] = useState<string>("")
    return (
        <div className={"p-4"}>
            <div className={"flex justify-between flex-col-reverse sm:flex-row"}>
                {/*История карты*/}
                <HistoryCard cardNumber={cardNumber}/>
                {/*Карта*/}
                <WalletContext.Provider value={{cardNumber, setCardNumber}}>
                    <UserCardInformation/>
                </WalletContext.Provider>
            </div>
        </div>
    )
}