function LoginCard({ username, password, setUsername, setPassword, error, handleSubmit }) {
    return (
        <div className="login-card">
            <h1>Login</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="login-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {error && <p className="login-error">{error}</p>}
                </div>

                <button className="login-button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginCard;