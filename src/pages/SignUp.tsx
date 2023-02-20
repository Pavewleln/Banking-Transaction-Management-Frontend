import {Link} from "react-router-dom";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "../components/SignInForm/TextField";
import {nameValidation, passwordValidation, phoneValidation, surnameValidation} from "../utils/validationSignIn";
import {ButtonForm} from "../components/SignInForm/ButtonForm";
import {FC} from "react";

interface ISignUpForm {
    name: string,
    surname: string,
    phone: string,
    password: string
}

export const SignUp: FC = () => {
    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<ISignUpForm>({
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            password: ""
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })
    const onSubmit: SubmitHandler<ISignUpForm> = data => {
        console.log(data)
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
                                name={"name"}
                                type={"name"}
                                control={control}
                                validation={nameValidation}
                                label={"Имя"}
                                placeholder={"Иван"}
                                error={errors.name}
                                id={"name"}
                            />
                            {/*Фамилия*/}
                            <TextField
                                name={"surname"}
                                type={"surname"}
                                control={control}
                                validation={surnameValidation}
                                label={"Фамилия"}
                                placeholder={"Иванов"}
                                error={errors.surname}
                                id={"surname"}
                            />
                            {/*Номер телефона*/}
                            <TextField
                                name={"phone"}
                                type={"phone"}
                                control={control}
                                validation={phoneValidation}
                                label={"Номер телефона"}
                                placeholder={"+7 (920) 631-11-38"}
                                error={errors.phone}
                                id={"phone"}
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
                            <ButtonForm isValid={isValid} label={"Зарегистрироваться"}/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Уже есть аккаунт? <Link to={"/signIn"}
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