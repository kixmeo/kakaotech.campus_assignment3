export default function Loading() {
    return (
        <main className="max-w-md mx-auto mt-20 p-8 text-center bg-white shadow-2xl shadow-gray-200/40 rounded-3xl border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-[#672be0] rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-semibold text-gray-500">데이터를 불러오는 중입니다...</p>
        </main>
    )
}