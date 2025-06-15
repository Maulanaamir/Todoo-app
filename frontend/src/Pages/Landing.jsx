import Button from '../Components/Button';

export default function Landing() {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: '#f4f4f4',
            color: '#333',
            textAlign: 'center',
            padding: '50px',
            minHeight: '100vh'
        }} >
            <h1 style={{fontSize: 36, marginBottom: 20}}>
                Welcome to Our Application
            </h1>
            <p>Aplikasi sederhana untuk mencatat dan mengelola tugas.</p>
            <div style={{marginTop: 30}}>
                <Button to="/login">Login</Button>
                <Button to="/register">Register</Button>
            </div>
        </div>
    )
}