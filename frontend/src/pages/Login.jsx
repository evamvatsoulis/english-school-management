import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import LoginCard from "../components/LoginCard";
import '../styles/pages/Login.css';
import '../styles/components/form.css';

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
                navigate("/students");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LoginCard
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSubmit}
        />
    );
}

export default Login;