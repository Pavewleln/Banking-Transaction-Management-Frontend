import {ReactNode} from "react";
import {Loader} from "./Loader";
import {useGetMeQuery} from "../store/auth/auth.api";
import {useAppSelector} from "../store";
import {getIsToken} from "../store/auth/auth.slice";

interface IAppLoader {
    children: ReactNode
}

export const AppLoader = ({children}: IAppLoader) => {
    const isLogged = useAppSelector(getIsToken())
    const {isLoading} = useGetMeQuery({
        skip: Boolean(isLogged)
    })
    if (isLoading) {
        return (
            <div className={"flex items-center justify-center h-screen dark:bg-gray-800"}>
                <Loader/>
            </div>
        )
    }
    return (<>{children}</>)
}