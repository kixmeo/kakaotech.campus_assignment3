"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("에러가 발생했습니다:", error)
    }, [error])

    return (
        <main className="max-w-md mx-auto mt-20 p-8 text-center bg-white shadow-2xl shadow-red-200/40 rounded-3xl border border-red-50">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">앗, 문제가 발생했어요</h2>
            <p className="text-sm text-gray-500 mb-8 break-keep">
                데이터를 불러오거나 처리하는 중에 일시적인 오류가 발생했습니다.
            </p>
            <button
                onClick={() => reset()}
                className="bg-[#672be0] hover:bg-[#5622bd] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-[#672be0]/20 w-full"
            >
                다시 시도하기
            </button>
        </main>
    )
}