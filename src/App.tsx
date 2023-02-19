import {Route, Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";

export default function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/signUp'} element={<SignUp/>}/>
                <Route path={'/signIn'} element={<SignIn/>}/>
            </Routes>
        </div>
    )
}