const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTodos() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/todos`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });
  return res.json();
}

export async function addTodo(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
}