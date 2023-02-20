import {FC, RefObject, useRef} from "react";
import {WelcomeStepPage} from "../components/WelcomeStepPage";
import {Link} from "react-router-dom";
import {CustomLink} from "../components/CustomLink";

export const Welcome: FC = () => {
    const start = useRef<HTMLDivElement>(null)
    const step1 = useRef<HTMLDivElement>(null)
    const step2 = useRef<HTMLDivElement>(null)
    const step3 = useRef<HTMLDivElement>(null)
    const end = useRef<HTMLDivElement>(null)
    const buttonHandler = (ref: RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    };
    return (
        <div className={"max-h-full"}>
            <WelcomeStepPage anchor={start}>
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                    Добро пожаловать в самый крутой онлайн банк!
                </h1>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                    Лучше вы ничего не видели :)
                </p>
                <button onClick={() => buttonHandler(step1)}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    Как начать
                </button>
                <p>У тебя уже есть аккаунт или ты просто хочешь пропустить? </p>
                <CustomLink text={"Жми сюда!"} to={"/signIn"}/>
            </WelcomeStepPage>
            <WelcomeStepPage anchor={step1}>
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                    Шаг 1
                </h1>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                    Для начала почитайте лицензионное соглашение
                </p>
                <button onClick={() => buttonHandler(step2)}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    Все гуд, давай дальше
                </button>
            </WelcomeStepPage>
            <WelcomeStepPage anchor={step2}>
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                    Шаг 2
                </h1>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                    Регистрация
                </p>
                <button onClick={() => buttonHandler(step3)}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    Вперед!
                </button>
            </WelcomeStepPage>
            <WelcomeStepPage anchor={step3}>
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                    Шаг 3
                </h1>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                    Выпусти свою первую карту!
                </p>
                <button onClick={() => buttonHandler(end)}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    Ооокей
                </button>
            </WelcomeStepPage>
            <WelcomeStepPage anchor={end}
                transitionTop={() => buttonHandler(start)}
            >
                <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                    Последний шаг
                </h1>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                    Наслаждайся онлайн банком. Больше ничего и не надо :)
                </p>
                <CustomLink text={"Начать пользоваться"} to={"/signUp"}/>
            </WelcomeStepPage>

        </div>
    )
}