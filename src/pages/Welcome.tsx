export const Welcome = () => {
    return (
        <div className={"max-h-full"}>
            <section className="bg-white dark:bg-gray-900 h-screen">
                <div className="py-8 px-4 mx-auto my-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                            Добро пожаловать в самый крутой онлайн банк!
                        </h1>
                        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                            Круче этого вы ничего не видели :)
                        </p>
                        <a href={"#step1"}
                           className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            Начать пользоваться
                        </a>
                    </div>
                </div>
            </section>
            <section id={"step1"} className="bg-white dark:bg-gray-900 h-screen">
                <div className="py-8 px-4 mx-auto my-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                            Добро пожаловать в самый крутой онлайн банк!
                        </h1>
                        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                            Круче этого вы ничего не видели :)
                        </p>
                        <button
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            Начать пользоваться
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}