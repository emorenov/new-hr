"use client";
import { useState, useEffect } from "react";

type Todo = { id: number; title: string; completed: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  }

  async function addTodo() {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTodos();
  }

  async function toggleComplete(id: number, completed: boolean) {
    await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, completed: !completed }),
    });
    fetchTodos();
  }

  async function deleteTodo(id: number) {
    await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  }

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          className="border p-2 flex-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={addTodo} className="ml-2 p-2 bg-blue-500 text-white">Add</button>
      </div>
      <ul>
        {todos.map(t => (
          <li key={t.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id, t.completed)}
              className="mr-2"
            />
            <span className={t.completed ? "line-through" : ""}>{t.title}</span>
            <button onClick={() => deleteTodo(t.id)} className="ml-auto text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}