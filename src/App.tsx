import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";
import { Welcome } from "./pages/Welcome";

export default function App() {
    return (
        <div>
            <Routes>
                <Route path={'/welcome'} element={<Welcome/>}/>
                <Route path={'/signUp'} element={<SignUp/>}/>
                <Route path={'/signIn'} element={<SignIn/>}/>
            </Routes>
            <div>
                <Header/>
                <div className={"flex items-center content-between"}>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}