import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {TextField} from "../Common/Forms/TextField";
import {passwordValidation, emailValidation} from "../utils/validationForm";
import {ButtonForm} from "../Common/Forms/ButtonForm";
import {useLoginMutation} from "../store/auth/auth.api";
import {useEffect} from "react";
import {setToken} from "../store/auth/auth.slice";
import {ISignInForm} from "../store/auth/auth.types";
import {useAppDispatch} from "../store";
import {toast} from "react-toastify";

export const SignIn = () => {
    // настройка
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [login, {
        data: token,
        isLoading: isLoadingLogin,
        isSuccess: isLoginSuccess,
        isError: isLoginError,
        error: loginError
    }] = useLoginMutation()

    const {handleSubmit, control, formState: {isValid}} = useForm<ISignInForm>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    // Если успешно
    useEffect(() => {
        if (isLoginSuccess && token) {
            dispatch(setToken({token}))
            setTimeout(() => {
                navigate('/home')
            }, 1000)
            toast.success("Вы успешно авторизованы!")
        }
    }, [isLoginSuccess])

    // Если ошибка
    useEffect(() => {
        if (isLoginError) {
            toast.error((loginError as any).data.message)
        }
    }, [isLoginError])

    const onSubmit: SubmitHandler<ISignInForm> = async (loginData) => {
        try {
            await login(loginData)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Войти
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            {/*Номер телефона*/}
                            <TextField
                                error={errors.email}
                                control={control}
                                name={"email"}
                                type={"email"}
                                validation={emailValidation}
                                label={"Почта"}
                                placeholder={"@"}
                                id={"email"}
                            />
                            {/*Пароль*/}
                            <TextField
                                control={control}
                                error={errors.password}
                                name={"password"}
                                type={"password"}
                                validation={passwordValidation}
                                label={"Пароль"}
                                placeholder={"******"}
                                id={"password"}
                            />
                            <ButtonForm isLoading={isLoadingLogin} isValid={isValid} label={"Войти"}/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Еще нет аккаунта?
                                <Link to={"/signUp"}
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}