import {toast} from "react-toastify";

export const copyElement = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast.success("Скопировано")
    }).catch(() => {
        toast.error("Не удалось скопировать")
    })
}