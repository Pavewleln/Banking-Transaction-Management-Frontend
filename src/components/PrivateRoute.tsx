import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../store";
import {getIsToken} from "../store/auth/auth.slice";

export const PrivateRoute = () => {
    const isToken = useAppSelector(getIsToken());
    return isToken ? <Outlet/> : <Navigate to={"/signIn"}/>
}