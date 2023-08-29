export function Spinner() {
    return (
        <div className="flex justify-center items-center h-10">
            <div
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-r-transparent border-[#EE2B7B] align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
                >
            </div>
        </div>
    )
}



