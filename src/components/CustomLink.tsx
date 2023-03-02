import {Link} from "react-router-dom";
import {FC} from "react";
interface ICustomLink {
    text: string,
    to: string
}
export const CustomLink: FC<ICustomLink> = ({text, to}) => {
    return (
        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={to}>
            {text}
        </Link>
    )
}