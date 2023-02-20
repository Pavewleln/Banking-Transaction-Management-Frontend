import { FC } from "react"

interface IButtonForm {
    isValid: boolean,
    label: string
}
export const ButtonForm: FC<IButtonForm> = ({isValid, label}: IButtonForm) => {
    return (
        <button
            className={`${!isValid ? 'bg-primary-100 hover:bg-primary-200' : 'bg-primary-600 hover:bg-primary-700'} w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            type="submit"
            disabled={!isValid}
        >
            {label}
        </button>
    )
}