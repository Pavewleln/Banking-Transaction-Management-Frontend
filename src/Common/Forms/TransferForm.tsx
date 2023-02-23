import {TextField} from "./TextField";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ButtonForm} from "./ButtonForm";
import {emailValidation, transferValidation} from "../../utils/validationForm";

interface ITransferForm {
    email: string,
    transfer: number | undefined
}

export const TransferForm = () => {
    const {handleSubmit, control, formState: {isValid}} = useForm<ITransferForm>({
        defaultValues: {
            email: "",
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
            <TextField id={"email"} control={control} label={"Почта получателя"} name={"email"} type={"text"}
                       placeholder={"@"} validation={emailValidation} error={errors.email}/>
            <TextField id={"transfer"} control={control} label={"Сумма:"} name={"transfer"} type={"text"}
                       placeholder={"1000.00"} validation={transferValidation} error={errors.transfer}/>
            <ButtonForm isLoading={false} isValid={isValid} label={"Перевести"}/>
        </form>
    )
}