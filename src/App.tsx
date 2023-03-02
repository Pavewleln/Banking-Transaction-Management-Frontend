import {Header} from "./components/Header";
import {getIsToken} from "./store/auth/auth.slice";
import {AppLoader} from "./components/AppLoader";
import {useAppSelector} from "./store";
import {ToastContainer} from "react-toastify";
import {useTheme} from "./hooks/useTheme";
import {Navigation} from "./components/Navigation";

export default function App() {
    const isToken = useAppSelector(getIsToken());
    const {theme} = useTheme()
    return (
        <div id={"app"} className={theme}>
            <AppLoader>
                <Header authorized={!!isToken}/>
                <Navigation/>
            </AppLoader>
            <ToastContainer/>
        </div>
    )
}