export const HistoryCardSkeleton = () => {
    return (
        <div className={"bg-gray-100 rounded-xl m-2 p-5 max-w-full w-full flex items-align justify-around flex-wrap dark:bg-gray-800"}>
            <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-72 h-72 m-5"></div>
            <div className="animate-pulse bg-gray-200 rounded-xl dark:bg-gray-700 w-[500px] h-72 m-auto m-5"></div>
        </div>
    )
}