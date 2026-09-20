import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import { getPaymentsByStudentId, createPayment } from "../services/paymentService";
import Sidebar from '../components/Sidebar';
import PaymentsList from '../components/payments/PaymentsList';
import StudentPayments from "../components/payments/StudentPayments";
import PaymentForm from "../components/payments/PaymentForm";
import '../styles/pages/StudentDetails.css';
import '../styles/components/students/StudentsList.css'

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadStudentError, setLoadStudentError] = useState("");
  const [loadPaymentsError, setLoadPaymentsError] = useState("");
  const [addPaymentError, setAddPaymentError] = useState("");

  const loadStudent = async () => {
    const response = await getStudentById(id);

    if (!response.ok) {
      setLoadStudentError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setStudent(response.data);
  };

  const loadPaymentsByStudentId = async () => {
    const response = await getPaymentsByStudentId(id);

    if (!response.ok) {
      setLoadPaymentsError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setPayments(response.data);
  };

  const addPayment = async (paymentData) => {
    const response = await createPayment(paymentData);

    if (!response.ok) {
      setLoadPaymentsError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setPayments((currentPayments) => [...currentPayments, response.data]);
    closeForm();
  };

  const openCreateForm = (month) => {
    setSelectedMonth(month);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

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

        <StudentPayments
          payments={payments}
          openCreateForm={openCreateForm}
        />

        {showForm &&
          <div className="modal-overlay">
            <div className="modal-content">
              <PaymentForm
                studentId={id}
                selectedMonth={selectedMonth}
                addPayment={addPayment}
                closeForm={closeForm}
              />
            </div>
          </div>
        }

        {payments && <PaymentsList payments={payments} />}

      </div>
    </div>
  );
}

export default StudentDetails;