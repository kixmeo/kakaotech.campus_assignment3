import { getTodos } from "../actions"
import TodoClientList from "./TodoClientList"

export default async function TodosPage() {
    const todos = await getTodos()

    return (
        <div className="max-w-md mx-auto mt-12 mb-12 bg-white shadow-2xl shadow-gray-200/60 rounded-3xl overflow-hidden border border-gray-100">
            <header className="bg-gradient-to-br from-[#672be0]/5 to-transparent px-6 py-6 border-b border-gray-100 flex flex-col items-center gap-3">
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                    Todo <span className="text-[#672be0]">Productivity</span>
                </h1>
            </header>

            <TodoClientList initialTodos={todos} />

            <footer className="text-center text-[10px] text-gray-300 py-3 border-t border-gray-50">
                © 2026 Todo Productivity
            </footer>
        </div>
    )
}