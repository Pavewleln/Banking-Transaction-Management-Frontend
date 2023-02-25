import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "../Common/Forms/TextField";
import {fullnameValidation, passwordValidation, emailValidation} from "../utils/validationForm";
import {ButtonForm} from "../Common/Forms/ButtonForm";
import {FC, useEffect} from "react";
import {useRegisterMutation} from "../store/auth/auth.api";
import {setToken} from "../store/auth/auth.slice";
import {ISignUpForm} from "../store/auth/auth.types";
import {useAppDispatch} from "../store";
import {toast} from "react-toastify";

export const SignUp: FC = () => {
    // настройка
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [register, {
        isLoading: isLoadingRegister,
        data: token,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError
    }] = useRegisterMutation()

    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<ISignUpForm>({
        defaultValues: {
            fullname: '',
            email: '',
            password: ''
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    // Если успешно
    useEffect(() => {
        if (isRegisterSuccess && token) {
            dispatch(setToken({token}))
            navigate('/home')
            toast.success("Вы успешно авторизованы!")
        }
    }, [isRegisterSuccess])

    // Если ошибка
    useEffect(() => {
        if (isRegisterError) {
            toast.error((registerError as any).data.message)
        }
    }, [isRegisterError])

    const onSubmit: SubmitHandler<ISignUpForm> = async (registerData) => {
        try {
            await register(registerData)
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Зарегистрироваться
                        </h1>
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
                            {/*Почта*/}
                            <TextField
                                name={"email"}
                                type={"email"}
                                control={control}
                                validation={emailValidation}
                                label={"Почта"}
                                placeholder={"@"}
                                error={errors.email}
                                id={"email"}
                            />
                            {/*Пароль*/}
                            <TextField
                                name={"password"}
                                type={"password"}
                                control={control}
                                validation={passwordValidation}
                                label={"Пароль"}
                                placeholder={"******"}
                                error={errors.password}
                                id={"password"}
                            />
                            <ButtonForm isLoading={isLoadingRegister} isValid={isValid} label={"Зарегистрироваться"}/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Уже есть аккаунт?
                                <Link to={"/signIn"}
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Войти
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}