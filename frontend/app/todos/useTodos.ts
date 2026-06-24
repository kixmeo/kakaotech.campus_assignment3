import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createTodo, updateTodo, deleteTodo } from "../actions"

export interface Todo {
    id: number
    title: string
    completed: boolean
    date: string
}

export type Filter = "all" | "active" | "completed"

function getLocalISODate(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function useTodos(initialTodos: Todo[]) {
    const [text, setText] = useState("")
    const [filter, setFilter] = useState<Filter>("all")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const router = useRouter()

    const selectedDateStr = useMemo(() => getLocalISODate(selectedDate), [selectedDate])
    const isToday = selectedDateStr === getLocalISODate(new Date())

    function handleChangeDate(direction: "prev" | "next" | "today") {
        setSelectedDate((prev) => {
            if (direction === "today") return new Date()
            const next = new Date(prev)
            next.setDate(next.getDate() + (direction === "prev" ? -1 : 1))
            return next
        })
        setEditingId(null)
    }

    const filteredTodos = initialTodos.filter((todo) => {
        if (todo.date !== selectedDateStr) return false
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    async function handleAdd() {
        if (!text.trim()) return
        await createTodo(text.trim(), selectedDateStr)
        setText("")
        router.refresh()
    }

    async function handleToggle(todo: Todo) {
        await updateTodo(todo.id, { completed: !todo.completed })
        router.refresh()
    }

    async function handleDelete(id: number) {
        await deleteTodo(id)
        if (editingId === id) setEditingId(null)
        router.refresh()
    }

    async function handleEditSubmit(id: number) {
        if (!editText.trim()) return
        await updateTodo(id, { title: editText.trim() })
        setEditingId(null)
        router.refresh()
    }

    function handleStartEdit(todo: Todo) {
        setEditingId(todo.id)
        setEditText(todo.title)
    }

    return {
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
    }
}
