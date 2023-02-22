import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "../components/Forms/TextField";
import {fullnameValidation, passwordValidation, phoneValidation} from "../utils/validationForm";
import {ButtonForm} from "../components/Forms/ButtonForm";
import {FC, useEffect} from "react";
import {useRegisterMutation} from "../store/auth/auth.api";
import {ISignUpForm} from "../types/auth";
import {setToken} from "../store/auth/auth.slice";
import {useAppDispatch} from "../hooks/useAppDispatch";

export const SignUp: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [register, {
        isLoading: isLoadingRegister,
        data: token,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError
    }] = useRegisterMutation()
    useEffect(() => {
        if (isRegisterSuccess && token) {
            dispatch(setToken({token}))
            navigate('/home')
        }
    }, [isRegisterSuccess])
    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<ISignUpForm>({
        defaultValues: {
            fullname: 'Павел Куликов',
            email: 'kulikovps2004@gmail.com',
            password: 'Werbi_223'
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })
    const onSubmit: SubmitHandler<ISignUpForm> = async (registerData) => {
        try {
            if (registerData) {
                await register(registerData)
            }
        } catch (err) {
            console.log(err)
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
                                label={"fullname"}
                                placeholder={"Иван"}
                                error={errors.fullname}
                                id={"fullname"}
                            />
                            {/*Номер телефона*/}
                            <TextField
                                name={"email"}
                                type={"email"}
                                control={control}
                                validation={phoneValidation}
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