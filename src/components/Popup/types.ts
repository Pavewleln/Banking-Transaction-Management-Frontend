import {ReactNode} from "react";

export interface IPopup {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void;
    children?: ReactNode
}