import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import { getPaymentsByStudentId } from "../services/paymentService";
import Sidebar from '../components/sidebar/Sidebar';
import PaymentsList from '../components/payments/PaymentsList';
import '../styles/pages/StudentDetails.css';
import '../styles/components/students/StudentsList.css'

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState("");
  const [loadPaymentsError, setLoadPaymentsError] = useState("");

  const loadStudent = async () => {
    const response = await getStudentById(id);

    if (!response.ok) {
      setError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setStudent(response.data);
    console.log(response.data);
  };

  const loadPaymentsByStudentId = async () => {
    const response = await getPaymentsByStudentId(id);

    if (!response.ok) {
      setLoadPaymentsError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setPayments(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    loadStudent();
    loadPaymentsByStudentId();
  }, [id]);

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">
        {student && (
          <div>
            <h1>{student.first_name} {student.last_name}</h1>
          </div>
        )}

        {payments && <PaymentsList payments={payments} />}

        <div className="student-details-actions">
          <button className="add-payment-button">Add new payment</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;