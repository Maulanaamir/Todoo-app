import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../ages/Login";
import Register from "../pages/Register";
import TodoList from "../pages/TodoList";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}