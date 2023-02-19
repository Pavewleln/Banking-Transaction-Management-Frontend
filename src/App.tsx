import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Header} from "./components/Header";
import {Welcome} from "./pages/Welcome";

export default function App() {
    return (
        <div>
            <Header authorized={false}/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/welcome'} element={<Welcome/>}/>
                <Route path={'/signUp'} element={<SignUp/>}/>
                <Route path={'/signIn'} element={<SignIn/>}/>
            </Routes>
        </div>
    )
}