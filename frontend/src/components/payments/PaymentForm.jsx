import { useState } from 'react';
import '../../styles/components/form.css';

function PaymentForm({ studentId, selectedMonth, selectedPayment, addPayment, editPayment, closeForm }) {
    const formatDate = (date) => new Date(date).toLocaleDateString('en-CA');

    const [paymentMonth, setPaymentMonth] = useState(selectedPayment ? selectedPayment.payment_month : selectedMonth.month);
    const [paymentYear, setPaymentYear] = useState(selectedPayment ? selectedPayment.payment_year : selectedMonth.year);
    const [amount, setAmount] = useState(selectedPayment ? selectedPayment.amount : "");
    const [paymentDate, setPaymentDate] = useState(selectedPayment ? formatDate(selectedPayment.payment_date) : formatDate(new Date()));
    const [paymentMethod, setPaymentMethod] = useState(selectedPayment ? selectedPayment.payment_method : "");
    const [notes, setNotes] = useState(selectedPayment ? selectedPayment.notes : "");

    const handleSubmit = (event) => {
        event.preventDefault();
        selectedPayment ? editPayment({ studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes }) :
            addPayment({ studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes });
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="payment-form-data">
                <div className="form-group">
                    <label htmlFor="month">Payment month:</label>
                    <input type="text" id="month" placeholder="Payment month" value={paymentMonth} onChange={(event) => setPaymentMonth(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Payment year:</label>
                    <input type="text" id="year" placeholder="Payment year" value={paymentYear} onChange={(event) => setPaymentYear(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" placeholder="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Payment date:</label>
                    <input type="date" id="date" placeholder="Payment date" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="method">Payment method:</label>
                    <input type="text" id="method" placeholder="Payment method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" placeholder="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
                </div>
            </div>

            <div className="form-actions">
                <button className="form-save" type="submit">Save</button>
                <button type="button" className="form-cancel" onClick={closeForm}>Cancel</button>
            </div>
        </form>
    );
}

export default PaymentForm;