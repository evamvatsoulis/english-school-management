import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import '../styles/login.css';

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
                alert(response.data.error);
            } else {
                localStorage.setItem("token", response.data.token);
                console.log(response.data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button className="login-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;