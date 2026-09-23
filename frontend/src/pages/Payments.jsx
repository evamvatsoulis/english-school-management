import { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';
import { getPayments } from '../services/paymentService';
import '../components/Sidebar';
import Sidebar from '../components/Sidebar';
import PaymentsTable from '../components/payments/PaymentsTable';

function Payments({ }) {
    const [students, setStudents] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [loadPaymentsError, setLoadPaymentsError] = useState("");

    const loadStudents = async () => {
        const response = await getStudents();
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate('/login');
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadStudentsError(response.data.error);
            return;
        }
        setStudents(response.data);
    };

    const loadPayments = async () => {
        const response = await getPayments();

        if (!response.ok) {
            setLoadPaymentsError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setPayments(response.data);
    };

    useEffect(() => {
        loadStudents();
        loadPayments();
    }, [])

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                <h1>Payments 2026-27</h1>

                {students &&
                    <PaymentsTable
                        students={students}
                        payments={payments}
                    />
                }
            </div>
        </div>
    );
}

export default Payments;