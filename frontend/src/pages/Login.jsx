import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import LoginCard from "../components/LoginCard/LoginCard";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await login(username, password);

            if (!response.ok) {
                console.error(response.data.error);
                setError(response.data.error);
                setLoading(false);
            } else {
                localStorage.setItem("token", response.data.token);
                console.log(response.data.message);
                setLoading(false);
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
            loading={loading}
        />
    );
}

export default Login;