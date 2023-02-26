import {TextField} from "./TextField";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ButtonForm} from "./ButtonForm";
import {cardValidation, transferValidation} from "../../utils/validationForm";
import {useTransferOnCardMutation} from "../../store/cards/cards.api";
import {useEffect} from "react";
import {toast} from "react-toastify";

interface ITransferForm {
    sum: number,
    recipient: string,
    sender: string
}

export const TransferForm = ({sender}: {sender: string}) => {
    const [transfer, {
        isLoading: isTransferOnCardLoading,
        isSuccess: isTransferOnCardSuccess,
        isError: isTransferOnCardError,
        error: transferOnCardError
    }] = useTransferOnCardMutation()
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            sum: 0,
            recipient: "",
            sender: sender
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

    const onSubmit: SubmitHandler<ITransferForm> = async (data) => {
        try {
            await transfer(data)
        } catch (err) {
            console.log(err)
        }
        console.log(data);
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