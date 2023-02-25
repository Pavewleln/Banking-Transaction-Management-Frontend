import {TextField} from "./TextField";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ButtonForm} from "./ButtonForm";
import {cardValidation, transferValidation} from "../../utils/validationForm";

interface ITransferForm {
    card: string,
    transfer: string
}

export const TransferForm = () => {
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            card: "",
            transfer: ""
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<ITransferForm> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <TextField
                id={"card"}
                control={control}
                label={"Карта получателя"}
                name={"card"}
                type={"number"}
                placeholder={"**** **** **** ****"}
                validation={cardValidation}
                error={errors.card}
            />
            <TextField
                id={"transfer"}
                control={control}
                label={"Сумма"}
                name={"transfer"}
                type={"number"}
                placeholder={"100"}
                validation={transferValidation}
                error={errors.transfer}
            />
            <ButtonForm isLoading={false} isValid={isValid} label={"Перевести"}/>
        </form>
    )
}