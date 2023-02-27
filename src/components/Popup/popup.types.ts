import {ReactNode} from "react";
import {ICreditCardOut} from "../../store/cards/cards.types";

export interface IPopup {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void;
    children?: ReactNode,
    cardDetails?: ICreditCardOut
}