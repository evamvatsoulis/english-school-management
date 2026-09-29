import { schoolYearMonths } from '../../../config/config';
import './StudentPayments.css';
import '../DataTable/DataTable.css';

function StudentPayments({ payments, openCreateForm, openEditForm, openDeleteMessage }) {
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