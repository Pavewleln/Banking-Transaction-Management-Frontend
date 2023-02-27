import {Theme, useTheme} from "../hooks/useTheme";

export const Settings = () => {
    const {theme, changeTheme} = useTheme()
    return (
        <section className="bg-white dark:bg-gray-900 h-screen">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input onClick={() => changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)} type="checkbox" value="" className="sr-only peer" checked={theme === Theme.DARK}/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-gray-200 dark:peer-focus:ring-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white">
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Тема </span>
                </label>
            </div>
        </section>
    )
}