import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import LoginCard from "../components/login/LoginCard";
import '../styles/pages/Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login(username, password);

            if (!response.ok) {
                console.error(response.data.error);
                setError(response.data.error);
            } else {
                localStorage.setItem("token", response.data.token);
                console.log(response.data.message);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <LoginCard
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                error={error}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default Login;