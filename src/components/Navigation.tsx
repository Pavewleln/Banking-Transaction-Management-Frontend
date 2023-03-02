import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {Home} from "../pages/Home";
import {Transactions} from "../pages/Transactions";
import {Logout} from "../pages/Logout";
import {Profile} from "../pages/Profile";
import {CreateNewCard} from "../pages/CreateNewCard";
import {CreditCardInfo} from "../pages/CreditCardInfo";
import {Welcome} from "../pages/Welcome";
import {SignUp} from "../pages/SignUp";
import {SignIn} from "../pages/SignIn";
import {Settings} from "../pages/Settings";
import {NotFound} from "../pages/NotFound";

export const Navigation = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Welcome/>}/>
            <Route path={'/signUp'} element={<SignUp/>}/>
            <Route path={'/signIn'} element={<SignIn/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/transactions'} element={<Transactions/>}/>
                <Route path={'/cards/create'} element={<CreateNewCard/>}/>
                <Route path={'/cards/info/:number'} element={<CreditCardInfo/>}/>
                <Route path={'/logout'} element={<Logout/>}/>
            </Route>
            <Route path={'/settings'} element={<Settings/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}