import {TextField} from "./TextField";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ButtonForm} from "./ButtonForm";
import {cardValidation, transferValidation} from "../../utils/validationForm";
import {useTransferOnCardMutation} from "../../store/cards/cards.api";
import {FC, useEffect} from "react";
import {toast} from "react-toastify";
import {ICreditCard} from "../../store/cards/cards.types";
import {useAddHistoryTransferMutation} from "../../store/history/history.api";
import {TypeCard} from "../../store/history/history.types";

interface ITransferForm {
    sum: number,
    recipient: string
}

export const TransferForm: FC<ICreditCard> = ({cardDetails}) => {
    const [transfer, {
        isLoading: isTransferOnCardLoading,
        isSuccess: isTransferOnCardSuccess,
        isError: isTransferOnCardError,
        error: transferOnCardError
    }] = useTransferOnCardMutation()
    const [addHistory] = useAddHistoryTransferMutation()
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            sum: 0,
            recipient: ""
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

    const onSubmit: SubmitHandler<ITransferForm> = async ({sum, recipient}) => {
        try {
            await transfer({
                sum: sum,
                sender: cardDetails.numberCard,
                recipient: recipient
            })
            await addHistory({
                sum: -sum,
                recipient: recipient,
                card: recipient,
                numberCardUser: cardDetails.numberCard,
                currency: cardDetails.currency,
                moneyType: TypeCard.transfer
            })
            await addHistory({
                sum: sum,
                recipient: cardDetails.numberCard,
                card: recipient,
                numberCardUser: recipient,
                currency: cardDetails.currency,
                moneyType: TypeCard.receiving
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <TextField
                id={"recipient"}
                control={control}
                label={"Карта получателя"}
                name={"recipient"}
                type={"number"}
                placeholder={"**** **** **** ****"}
                validation={cardValidation}
                error={errors.recipient}
            />
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
            <ButtonForm isLoading={isTransferOnCardLoading} isValid={isValid} label={"Перевести"}/>
        </form>
    )
}