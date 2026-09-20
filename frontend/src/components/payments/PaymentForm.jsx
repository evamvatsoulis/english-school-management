import { useState } from 'react';
import '../../styles/components/payments/PaymentForm.css';

function PaymentForm({ studentId, selectedMonth, addPayment, closeForm }) {
    const [paymentMonth, setPaymentMonth] = useState(selectedMonth.month);
    const [paymentYear, setPaymentYear] = useState(selectedMonth.year);
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addPayment({ studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes });
    };

    return (
        <form className="payment-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Payment month" value={paymentMonth} onChange={(event) => setPaymentMonth(event.target.value)} />

            <input type="text" placeholder="Payment year" value={paymentYear} onChange={(event) => setPaymentYear(event.target.value)} />

            <input type="text" placeholder="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />

            <input type="date" placeholder="Date" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} />

            <input type="text" placeholder="Method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} />

            <input type="text" placeholder="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} />

            <button className="payment-form-save" type="submit">Save</button>

            <button type="button" className="payment-form-cancel" onClick={closeForm}>Cancel</button>
        </form>
    );
}

export default PaymentForm;