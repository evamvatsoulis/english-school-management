import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';

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
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;