import { useEffect, useState } from "react";
import axios from "../api/axios";
import TodoItem from "../Components/TodoItem";
import TodoForm from "../Components/TodoForm";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/todos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(Array.isArray(res.data) ? res.data : []);
      } catch {
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = async (form, setError) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/todos", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.todo) {
        setTodos([...todos, res.data.todo]);
      } else {
        setError(res.data.message || "Gagal tambah todo");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal tambah todo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Todo</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
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
    </div>
  );
}