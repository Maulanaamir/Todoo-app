const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function Login(email, password) {
    const response = await fetch('${BASE_URL}/auth/login', {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({ email,password })
    });
    return response.json();
}

export async function Register (data) {
    const res = await fetch('$BASE_URL/auth/register', {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}