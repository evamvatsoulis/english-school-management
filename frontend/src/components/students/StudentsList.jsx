import { useNavigate } from 'react-router-dom';
import '../../styles/components/students/StudentsList.css';

function StudentsList({ students, openEditForm }) {
    const navigate = useNavigate();
    return (
        <div className="students-list">
            <div className="students-header">
                <span>Firstname</span>
                <span>Lastname</span>
                <span>Phone</span>
                <span>Email</span>
            </div>
            {students.map((student) => (
                <div className="student-row" key={student.id}>
                    <span>{student.first_name}</span>
                    <span>{student.last_name}</span>
                    <span>{student.phone}</span>
                    <span>{student.email}</span>
                    <div className="student-actions">
                        <button className="edit-button" onClick={() => openEditForm(student)}>Edit</button>
                        <button className="view-button" onClick={() => navigate(`/students/${student.id}`)}>View</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StudentsList;