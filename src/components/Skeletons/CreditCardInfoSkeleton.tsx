export const CreditCardInfoSkeleton = () => {
    return (
        <div className={"bg-gray-100 w-full max-w-full sm:max-w-lg rounded-xl p-2 m-2 flex flex-col items-center relative dark:bg-gray-800 m-auto"}>
            <div role="status" className="max-w-sm animate-pulse flex flex-row items-center">
                <div>
                    <div className="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-24 h-15 mr-2"></div>
                    <div className="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-24 h-15 mr-2"></div>
                </div>
                <div className="h-36 bg-gray-200 rounded-xl dark:bg-gray-700 w-64 mb-2"></div>
                <div>
                    <div className="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-24 h-15 ml-2"></div>
                    <div className="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5 w-24 h-15 ml-2"></div>
                </div>
            </div>
        </div>
    )
}