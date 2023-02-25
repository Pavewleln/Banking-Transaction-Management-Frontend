import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Header} from "./components/Header";
import {Welcome} from "./pages/Welcome";
import {NotFound} from "./pages/NotFound";
import {Logout} from "./pages/Logout";
import {getIsToken} from "./store/auth/auth.slice";
import {AppLoader} from "./components/AppLoader";
import {PrivateRoute} from "./components/PrivateRoute";
import {useAppSelector} from "./store";
import {ToastContainer} from "react-toastify";
import {Profile} from "./pages/Profile";

export default function App() {
    const isToken = useAppSelector(getIsToken());
    return (
        <div>
            <AppLoader>
                <Header authorized={!!isToken}/>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/logout'} element={<Logout/>}/>
                        <Route path={'/profile'} element={<Profile/>}/>
                    </Route>
                    <Route path={'/'} element={<Welcome/>}/>
                    <Route path={'/signUp'} element={<SignUp/>}/>
                    <Route path={'/signIn'} element={<SignIn/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AppLoader>
            <ToastContainer/>
        </div>
    )
}