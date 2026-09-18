function StudentsList({ students }) {
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
                </div>
            ))}
        </div>
    );
}

export default StudentsList;