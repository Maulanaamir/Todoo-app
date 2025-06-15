export default function TodoItem({ todo }) {
  // todo: { id, todo, priority, deadline_date, status }
  return (
    <li className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 border-b">
      <div className="flex-1">
        <span className={`font-semibold ${todo.status === "done" ? "line-through text-gray-400" : ""}`}>
          {todo.todo}
        </span>
        <div className="text-xs text-gray-500">
          Deadline: {todo.deadline_date}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded text-xs uppercase
          ${todo.priority === "high" ? "bg-red-500 text-white"
            : todo.priority === "medium" ? "bg-yellow-400 text-white"
            : "bg-green-500 text-white"}`}>
          {todo.priority}
        </span>
        <span className={`px-2 py-1 rounded text-xs
          ${todo.status === "done" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
          {todo.status}
        </span>
      </div>
    </li>
  );
}