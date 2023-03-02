import {FC, useEffect, useState} from "react";
import {IPopup} from "./popup.types";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {IUpdateProfile} from "../../store/auth/auth.types";
import {TextField} from "../Forms/TextField";
import {fullnameValidation} from "../../utils/ValidationForm";
import {ButtonForm} from "../Forms/ButtonForm";
import {useUpdateProfileMutation, useUploadAvatarMutation} from "../../store/auth/auth.api";
import {selectAuth} from "../../store/auth/auth.slice";
import {useAppSelector} from "../../store";
import {toast} from "react-toastify";
import {BASE_URL} from "../../types/baseUrl";

export const UpdateProfilePopup: FC<IPopup> = ({showModal, setShowModal}) => {
    const [imageUrl, setImageUrl] = useState("");
    const auth = useAppSelector(selectAuth())
    const [uploadAvatar, {
        data,
        isError: isUploadAvatarError,
        error: uploadAvatarError,
        isSuccess: isUploadAvatarSuccess
    }] = useUploadAvatarMutation()

    const [update, {
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        isLoading: isUpdateLoading,
        error: updateError
    }] = useUpdateProfileMutation()

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

    // Если успешно загружена ава
    useEffect(() => {
        if (isUploadAvatarSuccess ?? data.url) {
            setImageUrl(data.url)
        }
    }, [isUploadAvatarSuccess])

    // Если ошибка при загрузке авы
    useEffect(() => {
        if (isUploadAvatarError) {
            toast.error((uploadAvatarError as any).data.message)
        }
    }, [isUploadAvatarError])


    const onSubmit: SubmitHandler<IUpdateProfile> = async ({fullname}) => {
        try {
            await update({
                fullname,
                avatarUrl: imageUrl
            })
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже")
        }
    }

    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            await uploadAvatar(formData)
        } catch (err) {
            console.warn(err);
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
                        <div
                            className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                            <div className="mt-3">
                                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    <h4 className="text-lg font-medium text-gray-800 text-center dark:text-white">
                                        Изменить
                                    </h4>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                        {/*Фото*/}
                                        <div className={"m-auto flex items-center justify-center mt-5"}>
                                            {!imageUrl
                                                ? <div>
                                                    <label
                                                        className="cursor-pointer relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                                                        <input className={"hidden"} id="avatar" type="file"
                                                               onChange={(e) => handleChangeFile(e)}/>
                                                        <span
                                                            className="font-medium text-gray-600 dark:text-gray-300">{auth?.fullname.split(' ')[0]?.slice(0, 1)}{auth?.fullname.split(' ')[1]?.slice(0, 1)}</span>
                                                    </label>

                                                </div>
                                                : <div className={"relative"}>
                                                    <div
                                                        className={"inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all"}>
                                                        <img className="rounded w-36 h-36"
                                                             src={`${BASE_URL}${imageUrl}`}
                                                             alt="Extra large avatar"/>
                                                    </div>
                                                    <svg onClick={() => setImageUrl("")}
                                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5"
                                                         stroke="currentColor"
                                                         className="w-5 h-5 absolute top-0 right-0 cursor-pointer">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                    </svg>
                                                </div>
                                            }
                                        </div>
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
                                            className="w-full mt-2 p-2 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 dark:text-black dark:bg-white"
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
