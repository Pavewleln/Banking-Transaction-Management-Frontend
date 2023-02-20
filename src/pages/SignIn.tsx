import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {Link} from "react-router-dom";
import {TextField} from "../components/SignInForm/TextField";
import {passwordValidation, phoneValidation} from "../utils/validationSignIn";
import {ButtonForm} from "../components/SignInForm/ButtonForm";

interface ISignInForm {
    phone: string;
    password: string;
}

export const SignIn = () => {
    const {handleSubmit, control, formState: {isValid}} = useForm<ISignInForm>({
        defaultValues: {
            phone: "",
            password: ""
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<ISignInForm> = data => console.log(data);

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
                                error={errors.phone}
                                control={control}
                                name={"phone"}
                                type={"phone"}
                                validation={phoneValidation}
                                label={"Номер телефона"}
                                placeholder={"+7 920 631-11-38"}
                                id={"phone"}
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
                            <ButtonForm isValid={isValid} label={"Войти"}/>
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