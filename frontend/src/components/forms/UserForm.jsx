import { useState } from 'react';
import '../../styles/form.css';

function UserForm({ selectedUser, closeForm, formError, onSubmit }) {
    const [username, setUsername] = useState(selectedUser ? selectedUser.username : "");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(selectedUser ? selectedUser.role : "");

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({ username, password, role });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-data">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <input type="text" id="role" placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)} />
                </div>
            </div>

            <p className="form-error">{formError}</p>

            <div className="form-actions">
                <button className="form-save" type="submit">Save</button>
                <button type="button" className="form-cancel" onClick={closeForm}>Cancel</button>
            </div>
        </form>
    );
}

export default UserForm;