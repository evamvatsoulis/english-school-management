import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../services/studentService';
import { getPayments } from '../services/paymentService';
import PaymentsTable from '../components/tables/PaymentsTable/PaymentsTable';
import PageLayout from '../components/PageLayout/PageLayout';

function Payments({ }) {
    const [students, setStudents] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [loadPaymentsError, setLoadPaymentsError] = useState("");
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [paymentsLoading, setPaymentsLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadStudents = async () => {
        setLoadStudentsError("");
        setStudentsLoading(true);

        const response = await getStudents();
        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadStudentsError(response.data.error);
            setStudentsLoading(false);
            return;
        }

        setStudents(response.data.result);
        setStudentsLoading(false);
    };

    const loadPayments = async () => {
        setLoadPaymentsError("");
        setPaymentsLoading(true);

        const response = await getPayments();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadPaymentsError(response.data.error);
            console.error(response.data.error);
            setPaymentsLoading(false);
            return;
        }

        setPayments(response.data.result);
        setPaymentsLoading(false);
    };

    useEffect(() => {
        loadStudents();
        loadPayments();
    }, [])

    return (
        <PageLayout>
            <h1>Payments 2026-27</h1>

            {studentsLoading ? <p>Loading students...</p> :
                paymentsLoading ? <p>Loading payments...</p> :
                    !loadPaymentsError && !loadStudentsError &&
                    <PaymentsTable
                        students={students}
                        payments={payments}
                    />
            }
        </PageLayout>
    );
}

export default Payments;