import { useState } from 'react';
import '../DataTable/DataTable.css';

const formatDate = (date) => new Date(date).toLocaleString('en-GB');

function EnrollmentsTable({ enrollments, students }) {
    const [classSort, setClassSort] = useState(false);
    const [createdTimeSort, setCreatedTimeSort] = useState("asc");

    let displayedEnrollments = enrollments;


    displayedEnrollments = createdTimeSort === "asc" ?
        [...displayedEnrollments].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) :
        [...displayedEnrollments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    displayedEnrollments = classSort && [...displayedEnrollments].sort((a, b) => a.name.localeCompare(b.name)) || displayedEnrollments;

    return (
        <div className="table-section">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>
                            Class
                            <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }} onClick={() => setClassSort((current) => !current)}>
                                {classSort ? "filter_alt" : "filter_alt_off"}
                            </span>
                        </th>
                        <th>School Year</th>
                        <th>
                            Created at
                            <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }}
                                onClick={() => setCreatedTimeSort((current) => (current === "asc" ? "desc" : "asc"))}>
                                {createdTimeSort === "asc" ? "arrow_upward" : "arrow_downward"}
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {displayedEnrollments.map((enrollment) => {
                        const student = students.find((student) => student.id === enrollment.student_id);
                        return (
                            student &&
                            <tr key={enrollment.id}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{enrollment.name}</td>
                                <td>{enrollment.school_year}</td>
                                <td>{formatDate(enrollment.created_at)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default EnrollmentsTable;