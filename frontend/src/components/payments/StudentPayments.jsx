import '../../styles/components/payments/StudentPayments.css';
import '../../styles/components/list.css';

function StudentPayments({ payments, openCreateForm, openEditForm }) {
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
            <div className="list">

                <div className="student-payments-header">
                    <span>Month</span>
                    <span>Status</span>
                    <span>Amount</span>
                    <span>Action</span>
                </div>

                {schoolYearMonths.map((item) => {
                    const payment = payments.find(
                        (payment) =>
                            payment.payment_month === item.month &&
                            payment.payment_year === item.year
                    );

                    return (
                        <div className="student-payment-row" key={`${item.month}-${item.year}`}>
                            <span>{item.name}</span>

                            <span className={payment ? "paid" : "unpaid"}>{payment ? "Paid" : "Unpaid"}</span>

                            <span>{payment ? `€${payment.amount}` : "-"}</span>

                            <div className="actions">
                                {!payment ? <button className="add-button" onClick={() => openCreateForm(item)}>Add Payment</button>
                                    : <button className="edit-button" onClick={() => openEditForm(payment)}>Edit</button>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StudentPayments;