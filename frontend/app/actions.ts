"use server"

import { revalidatePath } from "next/cache"

export async function getTodos(date?: string) {
    const BACKEND_URL = process.env.BACKEND_URL;
    const url = date ? `${BACKEND_URL}/todos?date=${date}` : `${BACKEND_URL}/todos`
    const res = await fetch(url, { cache: "no-store" })
    return res.json()
}

export async function createTodo(title: string, date: string) {
    try {
        const BACKEND_URL = process.env.BACKEND_URL;
        console.log("createTodo called with:", { title, date });
        const res = await fetch(`${BACKEND_URL}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, date }),
        });
        const resText = await res.text();
        console.log("createTodo response:", res.status, resText);
        revalidatePath("/todos")
    } catch (e) {
        console.error("createTodo fetch failed:", e);
    }
}

export async function updateTodo(id: number, data: { title?: string; completed?: boolean }) {
    const BACKEND_URL = process.env.BACKEND_URL;
    await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    revalidatePath("/todos")
}

export async function deleteTodo(id: number) {
    const BACKEND_URL = process.env.BACKEND_URL;
    await fetch(`${BACKEND_URL}/todos/${id}`, { method: "DELETE" })
    revalidatePath("/todos")
}