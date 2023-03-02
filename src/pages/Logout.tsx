import {Loader} from "../components/Loader";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/auth/auth.slice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logout())
        setTimeout(() => {
            navigate('/signIn')
        }, 100)
        toast.success("Вы успешно вышли из системы")
    }, [])
    return (
        <div className={"flex items-center justify-center h-screen"}>
            <Loader/>
        </div>
    )
}