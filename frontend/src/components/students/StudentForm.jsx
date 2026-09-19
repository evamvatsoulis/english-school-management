import { useState } from 'react';
import '../../styles/components/students/StudentForm.css';

function StudentForm({ addStudent, editStudent, selectedStudent, closeForm }) {
    const [firstName, setFirstName] = useState(selectedStudent ? selectedStudent.first_name : "");
    const [lastName, setLastName] = useState(selectedStudent ? selectedStudent.last_name : "");
    const [phone, setPhone] = useState(selectedStudent ? selectedStudent.phone : "");
    const [email, setEmail] = useState(selectedStudent ? selectedStudent.email : "");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedStudent) {
            editStudent({ firstName, lastName, phone, email });
        } else {
            addStudent({ firstName, lastName, phone, email });
        }
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />

            <input type="text" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />

            <input type="text" placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />

            <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

            <button className="student-form-save" type="submit">Save</button>

            <button type="button" className="student-form-cancel" onClick={closeForm}>Cancel</button>
        </form>
    );
}

export default StudentForm;