"use client"

import { useTodos, Todo, Filter } from "./useTodos"

const FILTER_OPTIONS: { key: Filter; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "active", label: "진행 중" },
    { key: "completed", label: "완료" },
]

const EMPTY_MESSAGES: Record<Filter, string> = {
    all: "등록된 할 일이 없습니다.\n오늘 하루를 시작해볼까요? ✨",
    active: "진행 중인 할 일이 없습니다.\n모든 할 일을 완료했어요! 🎉",
    completed: "완료된 할 일이 없습니다.\n할 일을 완료해 보세요! 💪",
}

export default function TodoClientList({ initialTodos }: { initialTodos: Todo[] }) {
    const {
        text,
        setText,
        filter,
        setFilter,
        editingId,
        setEditingId,
        editText,
        setEditText,
        selectedDate,
        isToday,
        handleChangeDate,
        filteredTodos,
        handleAdd,
        handleToggle,
        handleDelete,
        handleEditSubmit,
        handleStartEdit,
    } = useTodos(initialTodos)

    return (
        <>
            {/* 날짜 헤더 */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
                <button
                    onClick={() => handleChangeDate("prev")}
                    className="p-2 text-gray-400 hover:text-[#672be0] hover:bg-[#672be0]/10 rounded-xl transition-all font-bold"
                >
                    &lt; 이전
                </button>
                <div className="flex flex-col items-center cursor-pointer" onClick={() => handleChangeDate("today")}>
                    <h2 className="text-lg font-bold text-gray-800">
                        {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                    </h2>
                    {isToday && <span className="text-[10px] font-semibold text-[#672be0] bg-[#672be0]/10 px-2 py-0.5 rounded-full mt-1">오늘</span>}
                    {!isToday && <span className="text-[10px] font-medium text-gray-400 mt-1">오늘로 이동</span>}
                </div>
                <button
                    onClick={() => handleChangeDate("next")}
                    className="p-2 text-gray-400 hover:text-[#672be0] hover:bg-[#672be0]/10 rounded-xl transition-all font-bold"
                >
                    다음 &gt;
                </button>
            </header>

            {/* 입력 폼 */}
            <div className="flex gap-2.5 px-6 py-4 bg-gray-50/30">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    className="border border-gray-200 px-4 py-2.5 flex-grow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#672be0] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="오늘 해야 할 일을 적어주세요..."
                />
                <button
                    onClick={handleAdd}
                    disabled={!text.trim()}
                    className="bg-[#672be0] hover:bg-[#5622bd] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm shadow-[#672be0]/10 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    추가
                </button>
            </div>

            {/* 필터 바 */}
            <div className="flex gap-2 px-6 py-3 border-b border-gray-50 bg-gray-50/20">
                {FILTER_OPTIONS.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 ${filter === key
                                ? "bg-[#672be0] text-white shadow-sm shadow-[#672be0]/15"
                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* 목록 */}
            <main className="pb-4">
                {filteredTodos.length === 0 ? (
                    <div className="py-12 px-6 text-center text-sm text-gray-400 font-medium whitespace-pre-line leading-relaxed">
                        {EMPTY_MESSAGES[filter]}
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-50">
                        {filteredTodos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex justify-between items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
                            >
                                {editingId === todo.id ? (
                                    <div className="flex gap-2.5 flex-grow mr-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleEditSubmit(todo.id)
                                                if (e.key === "Escape") setEditingId(null)
                                            }}
                                            className="border border-gray-200 px-3 py-1.5 flex-grow rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#672be0] focus:border-transparent transition-all duration-200"
                                        />
                                        <button
                                            onClick={() => handleEditSubmit(todo.id)}
                                            disabled={!editText.trim()}
                                            className="text-xs bg-[#672be0] hover:bg-[#5622bd] text-white px-3.5 py-1.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            저장
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3.5 py-1.5 rounded-xl font-medium transition-all duration-200"
                                        >
                                            취소
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <span
                                            className={`text-sm select-none transition-all duration-200 pr-4 break-all ${todo.completed
                                                    ? "line-through text-gray-300 font-normal"
                                                    : "text-gray-700 font-medium"
                                                }`}
                                        >
                                            {todo.title}
                                        </span>
                                        <div className="flex gap-1.5 shrink-0 items-center">
                                            <button
                                                onClick={() => handleStartEdit(todo)}
                                                className="text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-100 transition-all duration-200 font-medium"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => handleToggle(todo)}
                                                className={`text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200 font-semibold ${todo.completed
                                                        ? "text-[#672be0] bg-[#672be0]/10 hover:bg-[#672be0]/20"
                                                        : "text-white bg-[#672be0] hover:bg-[#5622bd]"
                                                    }`}
                                            >
                                                {todo.completed ? "해제" : "완료"}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(todo.id)}
                                                className="text-xs text-red-500 bg-red-50 hover:bg-red-100/80 px-2.5 py-1.5 rounded-lg transition-all duration-200 font-medium"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    )
}