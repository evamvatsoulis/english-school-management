import '../styles/pages/Login.css';
import '../styles/components/form.css';

function LoginCard({ username, password, setUsername, setPassword, error, handleSubmit }) {
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Login</h1>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-data">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className="login-error">{error}</p>}

                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginCard;