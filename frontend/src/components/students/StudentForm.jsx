import { useState } from 'react';

function StudentForm({ addStudent, closeCreateForm }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addStudent({ firstName, lastName, phone, email });
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />

            <input type="text" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />

            <input type="text" placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />

            <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

            <button className="student-form-save" type="submit">Save</button>

            <button type="button" className="student-form-cancel" onClick={closeCreateForm}>Cancel</button>
        </form>
    );
}

export default StudentForm;