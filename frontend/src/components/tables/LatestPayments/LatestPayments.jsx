import { useState } from 'react';
import { getUserFromToken } from '../../../utils/auth';
import '../DataTable/DataTable.css';

const formatDate = (date, key) =>
    key === "payment_date" ?
        new Date(date).toLocaleDateString('el-GR') :
        new Date(date).toLocaleString('en-US');

const isAdmin = () => {
    const user = getUserFromToken();
    return user?.role === "admin";
};

function LatestPayments({ payments, students, paymentColumns }) {
    const [sort, setSort] = useState(false);

    const sortedPayments = [...payments].sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));

    const displayedPayments = sort ?
        [...sortedPayments].sort((a, b) => a.payment_year - b.payment_year || a.payment_month - b.payment_month) :
        sortedPayments;

    return (
        <div className="table-section">
            <h2>Latest Payments</h2>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>

                        {paymentColumns.map((column) => (
                            column.key === "payment_month" ?
                                <th key={column.key}>
                                    {column.label}
                                    <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }} onClick={() => setSort((current) => !current)}>
                                        {sort ? "filter_alt" : "filter_alt_off"}
                                    </span>
                                </th> :
                                <th key={column.key}>{column.label}</th>
                        ))}

                        {isAdmin() && <th>Created at</th>}
                    </tr>
                </thead>

                <tbody>
                    {displayedPayments.map((payment) => {
                        const student = students.find((student) => payment.student_id === student.id);

                        return (
                            student &&
                            <tr key={payment.id}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>

                                {paymentColumns.map((column) => (
                                    column.key === "payment_date" ?
                                        <td key={column.key}>{formatDate(payment[column.key], column.key)}</td> :
                                        <td key={column.key}>{payment[column.key]}</td>
                                ))}

                                {isAdmin() && <td>{formatDate(payment.created_at)}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LatestPayments;