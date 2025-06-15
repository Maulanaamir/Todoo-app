import { useEffect, useState } from "react";
import { getTodos, addTodo } from "../api/todoApi";
import TodoItem from "../Components/TodoItem";
import TodoForm from "../Components/TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const handleAdd = async (form, setError) => {
    const res = await addTodo(form);
    if (res.data) {
      setTodos([...todos, res.data]);
    } else {
      setError(res.message || "Gagal tambah todo");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Task List</h1>
      <TodoForm onAdd={handleAdd} />
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <ul className="bg-white rounded shadow divide-y">
          {todos.length === 0 ? (
            <li className="p-4 text-center text-gray-400">Belum ada todo.</li>
          ) : (
            todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          )}
        </ul>
      )}
    </div>
  );
}