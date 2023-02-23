import {ReactNode} from "react";
import {Loader} from "../Common/Loader";
import {useGetMeQuery} from "../store/auth/auth.api";

interface IAppLoader {
    children: ReactNode
}

export const AppLoader = ({children}: IAppLoader) => {
    const {isLoading} = useGetMeQuery()
    if (isLoading) {
        return (
            <div className={"flex items-center justify-center h-screen"}>
                <Loader/>
            </div>
        )
    }
    return (<>{children}</>)
}