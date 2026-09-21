import { useState } from 'react';
import '../../styles/components/form.css';

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
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-data">
                <div className="form-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input type="text" name="firstname" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input type="text" name="lastname" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name="phone" placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
            </div>

            <div className="form-actions">
                <button className="form-save" type="submit">Save</button>
                <button type="button" className="form-cancel" onClick={closeForm}>Cancel</button>
            </div>
        </form>
    );
}

export default StudentForm;