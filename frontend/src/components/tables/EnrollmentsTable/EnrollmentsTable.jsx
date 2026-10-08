import { useState } from 'react';
import '../DataTable/DataTable.css';

const formatDate = (date) => new Date(date).toLocaleString('en-US');

function EnrollmentsTable({ enrollments, students }) {
    const [sort, setSort] = useState(false);

    const displayedEnrollments = sort ?
        [...enrollments].sort((a, b) => a.name.localeCompare(b.name)) :
        enrollments;

    return (
        <div className="table-section">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>
                            Class
                            <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }} onClick={() => setSort((current) => !current)}>
                                {sort ? "filter_alt" : "filter_alt_off"}
                            </span>
                        </th>
                        <th>School Year</th>
                        <th>Created at</th>
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