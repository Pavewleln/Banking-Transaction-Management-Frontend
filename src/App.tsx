import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Header} from "./components/Header";
import {Welcome} from "./pages/Welcome";
import {NotFound} from "./pages/NotFound";
import {Logout} from "./pages/Logout";
import {useAppSelector} from "./hooks/useAppSelector";
import {selectAuth, setAuth} from "./store/auth/auth.slice";
import {useGetMeQuery} from "./store/auth/auth.api";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/useAppDispatch";

export default function App() {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectAuth);
    const {data = null} = useGetMeQuery()
    useEffect(() => {
        dispatch(setAuth({data}))
    }, [data])
    return (
        <div>
            <Header authorized={isAuth}/>
            <Routes>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/'} element={<Welcome/>}/>
                <Route path={'/signUp'} element={<SignUp/>}/>
                <Route path={'/signIn'} element={<SignIn/>}/>
                <Route path={'/logout'} element={<Logout/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}