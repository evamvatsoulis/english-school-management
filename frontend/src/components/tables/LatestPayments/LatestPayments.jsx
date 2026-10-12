import { useState } from 'react';
import { getUserFromToken } from '../../../utils/auth';
import '../DataTable/DataTable.css';

const formatDate = (date, key) =>
    key === "payment_date" ?
        new Date(date).toLocaleDateString('en-GB') :
        new Date(date).toLocaleString('en-GB');

const isAdmin = () => {
    const user = getUserFromToken();
    return user?.role === "admin";
};

function LatestPayments({ payments, students, paymentColumns }) {
    const [monthSort, setMonthSort] = useState("");

    const sortedPayments = [...payments].sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));

    const displayedPayments = monthSort === "asc" ?
        [...sortedPayments].sort((a, b) => a.payment_year - b.payment_year || a.payment_month - b.payment_month) :
        monthSort === "desc" ?
            [...sortedPayments].sort((a, b) => b.payment_year - a.payment_year || b.payment_month - a.payment_month) :
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
                                    <span className="material-symbols-outlined" style={{ position: "relative", top: "5px" }}
                                        onClick={() => setMonthSort((current) => (
                                            current === "" ? "asc" :
                                                current === "asc" ? "desc" : ""
                                        ))}>
                                        {monthSort === "asc" ? "arrow_upward" :
                                            monthSort === "desc" ? "arrow_downward" : "unfold_more"}
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