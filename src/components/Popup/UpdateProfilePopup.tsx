import {FC, useEffect} from "react";
import {IPopup} from "./types";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {IUpdateProfile} from "../../store/auth/auth.types";
import {TextField} from "../../Common/Forms/TextField";
import {fullnameValidation} from "../../utils/validationForm";
import {ButtonForm} from "../../Common/Forms/ButtonForm";
import {useUpdateProfileMutation} from "../../store/auth/auth.api";
import {selectAuth} from "../../store/auth/auth.slice";
import {useAppSelector} from "../../store";
import {toast} from "react-toastify";

export const UpdateProfilePopup: FC<IPopup> = ({showModal, setShowModal}) => {
    const [update, {
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        isLoading: isUpdateLoading,
        error: updateError
    }] = useUpdateProfileMutation()
    const auth = useAppSelector(selectAuth())
    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<IUpdateProfile>({
        defaultValues: {
            fullname: auth?.fullname
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })
    // Если успешно
    useEffect(() => {
        if (isUpdateSuccess) {
            setShowModal(false)
            toast.success("Данные изменены")
        }
    }, [isUpdateSuccess])

    // Если ошибка
    useEffect(() => {
        if (isUpdateError) {
            toast.error((updateError as any).data.message)
        }
    }, [isUpdateError])
    const onSubmit: SubmitHandler<IUpdateProfile> = async (registerData) => {
        try {
            await update(registerData)
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже")
        }
    }
    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3">
                                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    <h4 className="text-lg font-medium text-gray-800 text-center">
                                        Изменить
                                    </h4>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                        {/*Имя*/}
                                        <TextField
                                            name={"fullname"}
                                            type={"text"}
                                            control={control}
                                            validation={fullnameValidation}
                                            label={"Имя"}
                                            placeholder={"Иван Иванов"}
                                            error={errors.fullname}
                                            id={"fullname"}
                                        />
                                        <ButtonForm isLoading={isUpdateLoading} isValid={isValid} label={"Изменить"}/>
                                    </form>
                                    <div className="items-center gap-2 mt-3 sm:flex">
                                        <button
                                            className="w-full mt-2 p-2 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            Назад
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
