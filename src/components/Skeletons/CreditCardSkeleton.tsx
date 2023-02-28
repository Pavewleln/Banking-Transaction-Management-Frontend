export const CreditCardSkeleton = () => {
    return (
        <div className={"bg-gray-100 w-full max-w-full sm:max-w-sm rounded-xl p-2 m-2 flex flex-col items-center relative dark:bg-gray-800"}>
            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-36 bg-gray-200 rounded-xl dark:bg-gray-700 w-64 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded-xl dark:bg-gray-700 max-w-[100px] mb-4 m-auto"></div>
                <div className="h-12 bg-gray-200 rounded-xl dark:bg-gray-700 mb-2.5"></div>
                <div className="h-8 bg-gray-200 rounded-xl dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
            </div>
        </div>
    )
}