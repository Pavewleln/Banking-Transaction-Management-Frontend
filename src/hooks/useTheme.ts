import {createContext, useContext} from "react";
import {GlobalContent} from "../types/banks";
interface Props {
    theme: Theme,
    changeTheme: (theme: Theme) => void
}
export enum Theme{
    LIGHT = 'light',
    DARK = 'dark'
}

export const ThemeContext = createContext<Props>({
    theme: Theme.LIGHT,
    changeTheme: () => {}
})
export const useTheme = () => {
    return useContext(ThemeContext);
};