import { schoolYearMonths } from "../../../config/config";
import '../DataTable/DataTable.css';
import '../StudentPayments/StudentPayments.css';

function PaymentsTable({ students, payments }) {
    return (
        <div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        {schoolYearMonths.map((item) => (
                            <th key={`${item.month}-${item.year}`}>{item.name}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => {
                        const studentPayments = payments.filter((payment) => payment.student_id === student.id)

                        return (
                            <tr key={student.id}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>

                                {schoolYearMonths.map((item) => {
                                    const payment = studentPayments.find((payment) =>
                                        payment.payment_month === item.month &&
                                        payment.payment_year === item.year);

                                    return (
                                        <td key={`${student.id}-${item.month}-${item.year}`} className={payment ? "paid" : "unpaid"}>{payment ? "Paid" : "Unpaid"}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentsTable;