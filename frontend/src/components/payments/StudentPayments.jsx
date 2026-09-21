import '../../styles/components/payments/StudentPayments.css';
import '../../styles/components/list.css';
import '../../styles/components/DataTable.css';

function StudentPayments({ payments, openCreateForm, openEditForm, openDeleteMessage }) {
    const schoolYearMonths = [
        { month: 9, year: 2026, name: "September" },
        { month: 10, year: 2026, name: "October" },
        { month: 11, year: 2026, name: "November" },
        { month: 12, year: 2026, name: "December" },
        { month: 1, year: 2027, name: "January" },
        { month: 2, year: 2027, name: "February" },
        { month: 3, year: 2027, name: "March" },
        { month: 4, year: 2027, name: "April" },
        { month: 5, year: 2027, name: "May" },
        { month: 6, year: 2027, name: "June" }
    ];

    return (
        <div>
            <h2>Payments 2026/2027</h2>
            <table className="data-table">

                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {schoolYearMonths.map((item) => {
                        const payment = payments.find(
                            (payment) =>
                                payment.payment_month === item.month &&
                                payment.payment_year === item.year
                        );

                        return (
                            <tr key={`${item.month}-${item.year}`}>
                                <td>{item.name}</td>

                                <td className={payment ? "paid" : "unpaid"}>{payment ? "Paid" : "Unpaid"}</td>

                                <td>{payment ? `€${payment.amount}` : "-"}</td>

                                <td>
                                    {!payment ?
                                        <button className="add-button" onClick={() => openCreateForm(item)}>Add Payment</button>
                                        : <div className="actions">
                                            <span className="material-symbols-outlined" onClick={() => openEditForm(payment)}>edit</span>
                                            <span className="material-symbols-outlined" onClick={() => openDeleteMessage(payment)}>delete</span>
                                        </div>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentPayments;