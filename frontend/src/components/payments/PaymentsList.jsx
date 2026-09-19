import '../../styles/components/payments/PaymentsList.css'

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

function PaymentsList({ payments }) {
    return (
        <div className="payments-list">
            <div className="payments-header">
                <span>Month</span>
                <span>Year</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Method</span>
                <span>Notes</span>
            </div>
            {payments.map((payment) => (
                <div className="payment-row" key={payment.id}>
                    <span>{payment.payment_month}</span>
                    <span>{payment.payment_year}</span>
                    <span>{payment.amount}</span>
                    <span>{formatDate(payment.payment_date)}</span>
                    <span>{payment.method}</span>
                    <span>{payment.notes}</span>
                </div>
            ))}
        </div>
    );
}

export default PaymentsList;