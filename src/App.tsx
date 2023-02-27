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
import {CreateNewCard} from "./pages/CreateNewCard";
import {CreditCardInfo} from "./pages/CreditCardInfo";
import {Settings} from "./pages/Settings";
import {useTheme} from "./hooks/useTheme";

export default function App() {
    const isToken = useAppSelector(getIsToken());
    const {theme} = useTheme()
    return (
        <div id={"app"} className={theme}>
            <AppLoader>
                <Header authorized={!!isToken}/>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/logout'} element={<Logout/>}/>
                        <Route path={'/profile'} element={<Profile/>}/>
                        <Route path={'/cards/create'} element={<CreateNewCard/>}/>
                        <Route path={'/cards/info/:number'} element={<CreditCardInfo/>}/>
                    </Route>
                    <Route path={'/'} element={<Welcome/>}/>
                    <Route path={'/signUp'} element={<SignUp/>}/>
                    <Route path={'/signIn'} element={<SignIn/>}/>
                    <Route path={'/settings'} element={<Settings/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AppLoader>
            <ToastContainer/>
        </div>
    )
}