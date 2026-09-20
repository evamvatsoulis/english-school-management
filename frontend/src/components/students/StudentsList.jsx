import { useNavigate } from 'react-router-dom';
import '../../styles/components/students/StudentsList.css';
import '../../styles/components/list.css';

function StudentsList({ students, openEditForm, openDeleteMessage }) {
    const navigate = useNavigate();
    return (
        <div className="list">
            <div className="header">
                <span>Firstname</span>
                <span>Lastname</span>
                <span>Phone</span>
                <span>Email</span>
                <span>Actions</span>
            </div>
            {students.map((student) => (
                <div className="row" key={student.id}>
                    <span>{student.first_name}</span>
                    <span>{student.last_name}</span>
                    <span>{student.phone}</span>
                    <span>{student.email}</span>
                    <div className="actions">
                        <button className="edit-button" onClick={() => openEditForm(student)}>Edit</button>
                        <button className="view-button" onClick={() => navigate(`/students/${student.id}`)}>View payments</button>
                        <button className="delete-button" onClick={() => openDeleteMessage(student)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StudentsList;