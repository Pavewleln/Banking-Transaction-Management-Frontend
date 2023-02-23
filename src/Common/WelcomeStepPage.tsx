import {FC, ReactNode, RefObject} from "react";

interface IWelcomeStepPage {
    anchor: RefObject<HTMLDivElement>,
    children?: ReactNode,
    transitionTop?: () => void,
}

export const WelcomeStepPage: FC<IWelcomeStepPage> = ({
                                                          anchor,
                                                          children,
                                                          transitionTop
                                                      }) => {
    return (
        <section ref={anchor} className="bg-white dark:bg-gray-900 h-screen relative">
            <div className="py-8 px-4 mx-auto my-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    {children}
                </div>
            </div>
            {transitionTop && <div className="absolute bottom-10 right-10">
                <button className={"flex items-center hover:text-cyan-600 transition"}
                        onClick={transitionTop}>
                    К началу
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"/>
                    </svg>
                </button>
            </div>
            }

        </section>
    )
}