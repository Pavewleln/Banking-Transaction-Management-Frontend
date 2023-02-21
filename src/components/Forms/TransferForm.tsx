import {TextField} from "./TextField";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ButtonForm} from "./ButtonForm";
import {phoneValidation, transferValidation} from "../../utils/validationForm";

interface ITransferForm {
    phone: string,
    transfer: number | undefined
}

export const TransferForm = () => {
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            phone: "",
            transfer: 0
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<ITransferForm> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <TextField id={"phone"} control={control} label={"Номер получателя"} name={"phone"} type={"text"}
                       placeholder={"+7 920 631-11-38"} validation={phoneValidation} error={errors.phone}/>
            <TextField id={"transfer"} control={control} label={"Сумма:"} name={"transfer"} type={"text"}
                       placeholder={"1000.00"} validation={transferValidation} error={errors.transfer}/>
            <ButtonForm isValid={isValid} label={"Перевести"}/>
        </form>
    )
}