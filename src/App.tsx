import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Header} from "./components/Header";
import {Welcome} from "./pages/Welcome";
import {NotFound} from "./pages/NotFound";

export default function App() {
    return (
        <div>
            <Header authorized={true}/>
            <Routes>
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/'} element={<Welcome/>}/>
                <Route path={'/signUp'} element={<SignUp/>}/>
                <Route path={'/signIn'} element={<SignIn/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}