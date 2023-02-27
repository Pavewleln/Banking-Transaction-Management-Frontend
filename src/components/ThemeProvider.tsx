import {ReactNode, useState} from "react";
import { storage } from "../utils/Storage";
import { Theme, ThemeContext } from "../hooks/useTheme";

interface Props {
    children: ReactNode
}

export const ThemeProvider = ({children, ...props}: Props) => {
    const [theme, setTheme] = useState<Theme>(storage.getItem('theme') || Theme.LIGHT)

    function changeTheme(theme: Theme){
        storage.setItem('theme', theme)
        setTheme(theme)
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme}} {...props}>
            {children}
        </ThemeContext.Provider>
    )
}