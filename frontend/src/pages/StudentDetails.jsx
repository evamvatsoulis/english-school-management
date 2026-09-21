import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import { getPaymentsByStudentId, createPayment, updatePayment, deletePayment } from "../services/paymentService";
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
  const [showForm, setShowForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [loadStudentError, setLoadStudentError] = useState("");
  const [loadPaymentsError, setLoadPaymentsError] = useState("");
  const [addPaymentError, setAddPaymentError] = useState("");
  const [editPaymentError, setEditPaymentError] = useState("");
  const [deletePaymentError, setDeletePaymentError] = useState("");

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

  const editPayment = async (paymentData) => {
    const response = await updatePayment(selectedPayment.id, paymentData);

    if (!response.ok) {
      setEditPaymentError(response.data.error);
      console.error(response.data.error);
      return;
    }
    setPayments((currentPayments) => currentPayments.map((payment) => payment.id === response.data.id ? response.data : payment));
    closeForm();
  };

  const removePayment = async () => {
    const response = await deletePayment(selectedPayment.id);
    if (response.status === 401) {
      localStorage.removeItem("token");
    }

    if (!response.ok) {
      console.error(response.data.error);
      setDeletePaymentError(response.data.error);
      return;
    }
    closeDeleteMessage();
  };

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

  const closeForm = () => setShowForm(false);

  const closeDeleteMessage = () => setShowDeleteMessage(false);

  useEffect(() => {
    loadStudent();
    loadPaymentsByStudentId();
  }, [id, payments]);

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
          openEditForm={openEditForm}
          openDeleteMessage={openDeleteMessage}
        />

        {showForm &&
          <div className="modal-overlay">
            <div className="modal-content">
              <PaymentForm
                studentId={id}
                selectedMonth={selectedMonth}
                selectedPayment={selectedPayment}
                addPayment={addPayment}
                editPayment={editPayment}
                closeForm={closeForm}
              />
            </div>
          </div>
        }

        {showDeleteMessage &&
          <div className="modal-overlay">
            <div className="modal-content">
              <DeleteMessage
                removePayment={removePayment}
                closeDeleteMessage={closeDeleteMessage}
              />
            </div>
          </div>
        }

        {payments &&
          <DataTable
            columns={paymentColumns}
            data={payments}
          />
        }

      </div>
    </div>
  );
}

export default StudentDetails;