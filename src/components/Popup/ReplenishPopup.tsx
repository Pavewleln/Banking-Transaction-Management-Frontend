import {ChangeEvent, FC, useEffect, useState} from "react";
import {IPopup} from "./popup.types";
import {useGetAllMyCardsQuery, useTransferOnCardMutation} from "../../store/cards/cards.api";
import {UpdateNumberCard} from "../../utils/UpdateNumberCard";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {toast} from "react-toastify";
import {TextField} from "../Forms/TextField";
import {transferValidation} from "../../utils/ValidationForm";
import {ButtonForm} from "../Forms/ButtonForm";

interface ITransferForm {
    sum: number
}

export const ReplenishPopup: FC<IPopup> = ({showModal, setShowModal, cardDetails}) => {
    const {data: cards} = useGetAllMyCardsQuery()
    const [numberCardOne, setNumberCardOne] = useState<string>();
    const changeCardSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setNumberCardOne(e.target.value.replace(/ /g, ''))
    }
    const [transfer, {
        isLoading: isTransferOnCardLoading,
        isSuccess: isTransferOnCardSuccess,
        isError: isTransferOnCardError,
        error: transferOnCardError
    }] = useTransferOnCardMutation()
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            sum: 0
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    // Если успешно
    useEffect(() => {
        if (isTransferOnCardSuccess) {
            toast.success("Перевод выполнен!")
        }
    }, [isTransferOnCardSuccess])

    // Если ошибка
    useEffect(() => {
        if (isTransferOnCardError) {
            toast.error((transferOnCardError as any).data.message)
        }
    }, [isTransferOnCardError])

    const onSubmit: SubmitHandler<ITransferForm> = async ({sum}) => {
        try {
            if (numberCardOne && cardDetails) {
                await transfer({
                    sum: sum,
                    sender: cardDetails?.numberCard,
                    recipient: numberCardOne
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {showModal ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <form onSubmit={handleSubmit(onSubmit)}
                              className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                            <div className="mt-2 text-center sm:text-left">
                                {cards && <select
                                    onChange={changeCardSelect}
                                    id="large"
                                    className="block w-full px-4 py-3 my-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    {cards.map((card) => (
                                        <option value={card.numberCard}
                                                key={card._id}>{UpdateNumberCard(card.numberCard)}</option>
                                    ))}
                                </select>
                                }
                            </div>
                            <TextField
                                id={"sum"}
                                control={control}
                                label={"Сумма"}
                                name={"sum"}
                                type={"number"}
                                placeholder={"100"}
                                validation={transferValidation}
                                error={errors.sum}
                            />
                            <ButtonForm isLoading={isTransferOnCardLoading} isValid={isValid} label={"Пополнить"}/>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    )
}