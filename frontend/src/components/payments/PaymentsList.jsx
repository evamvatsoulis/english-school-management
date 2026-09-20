import '../../styles/components/payments/PaymentsList.css'
import '../../styles/components/list.css';

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

function PaymentsList({ payments }) {
    return (
        <div>
            <h2>Payments History</h2>

            <div className="list">
                <div className="payments-history-header">
                    <span>Month</span>
                    <span>Year</span>
                    <span>Amount</span>
                    <span>Date</span>
                    <span>Method</span>
                    <span>Notes</span>
                </div>
                {payments.map((payment) => (
                    <div className="payments-history-row" key={payment.id}>
                        <span>{payment.payment_month}</span>
                        <span>{payment.payment_year}</span>
                        <span>{payment.amount}</span>
                        <span>{formatDate(payment.payment_date)}</span>
                        <span>{payment.method}</span>
                        <span>{payment.notes}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaymentsList;