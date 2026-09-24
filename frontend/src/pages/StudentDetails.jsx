import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import { getPaymentsByStudentId, createPayment, updatePayment, deletePayment } from "../services/paymentService";
import { getEnrollmentsByStudent } from "../services/enrollmentService";
import { paymentColumns } from "../config/config";
import Sidebar from '../components/Sidebar';
import StudentPayments from "../components/payments/StudentPayments";
import PaymentForm from "../components/payments/PaymentForm";
import DataTable from "../components/DataTable";
import DeleteMessage from '../components/DeleteMessage';

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [loadStudentError, setLoadStudentError] = useState("");
  const [loadPaymentsError, setLoadPaymentsError] = useState("");
  const [addPaymentError, setAddPaymentError] = useState("");
  const [editPaymentError, setEditPaymentError] = useState("");
  const [deletePaymentError, setDeletePaymentError] = useState("");
  const [loadEnrollmentsByStudentError, setLoadEnrollmentsByStudentError] = useState("");

  const navigate = useNavigate();

  const handleUnauthorizedError = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  const loadStudent = async () => {
    const response = await getStudentById(id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setLoadStudentError(response.data.error);
      console.error(response.data.error);
      return;
    }

    setStudent(response.data);
    setLoadStudentError("");
  };

  const loadPaymentsByStudentId = async () => {
    const response = await getPaymentsByStudentId(id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setLoadPaymentsError(response.data.error);
      console.error(response.data.error);
      return;
    }

    setPayments(response.data);
    setLoadPaymentsError("");
  };

  const addPayment = async (paymentData) => {
    const response = await createPayment(paymentData);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setAddPaymentError(response.data.error);
      console.error(response.data.error);
      return;
    }

    console.log(response.data.message);
    loadPaymentsByStudentId(id);
    closeForm();
  };

  const editPayment = async (paymentData) => {
    const response = await updatePayment(selectedPayment.id, paymentData);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setEditPaymentError(response.data.error);
      console.error(response.data.error);
      return;
    }

    console.log(response.data.message);
    loadPaymentsByStudentId(id);
    closeForm();
  };

  const removePayment = async () => {
    const response = await deletePayment(selectedPayment.id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      console.error(response.data.error);
      setDeletePaymentError(response.data.error);
      return;
    }

    console.log(response.data.message);
    closeDeleteMessage();
    loadPaymentsByStudentId();
  };

  const loadEnrollmentsByStudent = async () => {
    const response = await getEnrollmentsByStudent(id);
    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      console.error(response.data.error);
      setLoadEnrollmentsByStudentError(response.data.error);
      return;
    }

    setEnrollments(response.data);
  }

  const openCreateForm = (month) => {
    setSelectedMonth(month);
    setSelectedPayment(null);
    setShowForm(true);
  };

  const openEditForm = (payment) => {
    setSelectedPayment(payment)
    setShowForm(true);
  };

  const openDeleteMessage = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteMessage(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setAddPaymentError("");
    setEditPaymentError("");
  };

  const closeDeleteMessage = () => setShowDeleteMessage(false);

  const handleSubmit = (paymentData) => {
    selectedPayment ? editPayment(paymentData) :
      addPayment(paymentData);
  };

  useEffect(() => {
    loadStudent();
    loadPaymentsByStudentId();
    loadEnrollmentsByStudent();
  }, [id]);

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">
        {student && !loadStudentError && (
          <div>
            <h1>{student.first_name} {student.last_name}</h1>
            {enrollments.map((enrollment) => (
              enrollment.school_year === "2026-2027" && <h2 key={enrollment.id}>Class: {enrollment.name}</h2>
            ))}
          </div>
        )}

        {!loadPaymentsError &&
          <StudentPayments
            payments={payments}
            openCreateForm={openCreateForm}
            openEditForm={openEditForm}
            openDeleteMessage={openDeleteMessage}
          />
        }

        {showForm &&
          <div className="modal-overlay">
            <div className="modal-content">
              <PaymentForm
                studentId={id}
                selectedMonth={selectedMonth}
                selectedPayment={selectedPayment}
                closeForm={closeForm}
                onSubmit={handleSubmit}
                formError={selectedPayment ? editPaymentError : addPaymentError}
              />
            </div>
          </div>
        }

        {showDeleteMessage &&
          <div className="modal-overlay">
            <div className="modal-content">
              <DeleteMessage
                deleteFunction={removePayment}
                closeDeleteMessage={closeDeleteMessage}
                item={"payment"}
              />
            </div>
          </div>
        }

        {!loadPaymentsError &&
          <DataTable
            columns={paymentColumns}
            data={payments}
            title={"Payments History"}
          />
        }

      </div>
    </div>
  );
}

export default StudentDetails;