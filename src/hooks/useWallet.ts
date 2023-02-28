import {createContext, useContext} from "react";
import {GlobalContent} from "../types/banks";

export const WalletContext = createContext<GlobalContent>({
    cardNumber: "",
    setCardNumber: () => {}
})
export const useWallet = () => {
    return useContext(WalletContext);
};