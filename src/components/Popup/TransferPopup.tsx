import {FC} from "react";
import {IPopup} from "./popup.types";
import {TransferForm} from "../Forms/TransferForm";

export const TransferPopup: FC<IPopup> = ({showModal, setShowModal, cardDetails}) => {
    return (
        <div>
            {showModal ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                            <div className="mt-2 text-center sm:text-left">

                                {cardDetails &&
                                    <TransferForm cardDetails={cardDetails}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}