import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [form, setForm] = useState({
    todo: "",
    priority: "",
    deadline_date: "",
  });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!form.todo || !form.priority || !form.deadline_date) {
      setError("Semua field wajib diisi!");
      return;
    }
    await onAdd(form, setError);
    setForm({ todo: "", priority: "", deadline_date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="mb-3">
        <label className="block mb-1 font-medium" htmlFor="todo">Task</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          id="todo"
          name="todo"
          type="text"
          value={form.todo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium" htmlFor="priority">Priority</label>
        <select
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
        >
          <option value="" hidden>Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium" htmlFor="deadline_date">Deadline</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          id="deadline_date"
          name="deadline_date"
          type="date"
          value={form.deadline_date}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add Todo
      </button>
    </form>
  );
}