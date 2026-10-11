import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import { getPaymentsByStudentId, createPayment, updatePayment, deletePayment } from "../services/paymentService";
import { getEnrollmentsByStudent } from "../services/enrollmentService";
import { exportToPdf } from "../services/exportService";
import { paymentColumns, pdfPaymentsColumns } from "../config/config";
import StudentPayments from "../components/tables/StudentPayments/StudentPayments";
import PaymentForm from "../components/forms/PaymentForm";
import DataTable from "../components/tables/DataTable/DataTable";
import Modal from "../components/modal/Modal";
import ModalOverlay from "../components/modal/ModalOverlay";
import PageLayout from '../components/PageLayout/PageLayout';

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadStudentError, setLoadStudentError] = useState("");
  const [loadPaymentsError, setLoadPaymentsError] = useState("");
  const [addPaymentError, setAddPaymentError] = useState("");
  const [editPaymentError, setEditPaymentError] = useState("");
  const [deletePaymentError, setDeletePaymentError] = useState("");
  const [loadEnrollmentsByStudentError, setLoadEnrollmentsByStudentError] = useState("");
  const [downloadPdfError, setDownloadPdfError] = useState("");
  const [studentLoading, setStudentLoading] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [addPaymentLoading, setAddPaymentLoading] = useState(false);
  const [editPaymentLoading, setEditPaymentLoading] = useState(false);
  const [removePaymentLoading, setRemovePaymentLoading] = useState(false);

  const navigate = useNavigate();

  const handleUnauthorizedError = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  const loadStudent = async () => {
    setLoadStudentError("");
    setStudentLoading(true);

    const response = await getStudentById(id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setLoadStudentError(response.data.error);
      console.error(response.data.error);
      setStudentLoading(false);
      return;
    }

    setStudent(response.data.result);
    setStudentLoading(false);
  };

  const loadPaymentsByStudentId = async () => {
    setLoadPaymentsError("");
    setPayments([]);
    setPaymentsLoading(true);

    const response = await getPaymentsByStudentId(id);

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
    console.log(response.data.message);
    setPaymentsLoading(false);
  };

  const addPayment = async (paymentData, sendEmail) => {
    setAddPaymentError("");
    setAddPaymentLoading(true);

    let response;
    const notificationData = { email: student ? student.email : "student-service-error" };

    if (sendEmail) {
      response = await createPayment(paymentData, notificationData);
    } else {
      response = await createPayment(paymentData);
    }

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setAddPaymentError(response.data.error);
      console.error(response.data.error);
      setAddPaymentLoading(false);
      return;
    }

    console.log(response.data.message);
    setAddPaymentLoading(false);

    setTimeout(() => {
      alert(response.data.emailStatus);
    }, 50);

    loadPaymentsByStudentId(id);
    closeForm();
  };

  const editPayment = async (paymentData) => {
    setEditPaymentError("");
    setEditPaymentLoading(true);

    const response = await updatePayment(selectedPayment.id, paymentData);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      setEditPaymentError(response.data.error);
      console.error(response.data.error);
      setEditPaymentLoading(false);
      return;
    }

    console.log(response.data.message);
    setEditPaymentLoading(false);
    loadPaymentsByStudentId(id);
    closeForm();
  };

  const removePayment = async () => {
    setRemovePaymentLoading(true);
    const response = await deletePayment(selectedPayment.id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      console.error(response.data.error);
      setDeletePaymentError(response.data.error);
      setRemovePaymentLoading(false);
      return;
    }

    console.log(response.data.message);
    setRemovePaymentLoading(false);
    closeDeleteModal();
    loadPaymentsByStudentId();
  };

  const loadEnrollmentsByStudent = async () => {
    setLoadEnrollmentsByStudentError("");
    setEnrollmentLoading(true);
    setEnrollments([]);

    const response = await getEnrollmentsByStudent(id);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      console.error(response.data.error);
      setLoadEnrollmentsByStudentError(response.data.error);
      setEnrollmentLoading(false);
      return;
    }

    setEnrollments(response.data.result);
    setEnrollmentLoading(false);
  };

  const downloadPdf = async (tableName, columns, tableData) => {
    setDownloadPdfError("");

    const response = await exportToPdf(tableName, columns, tableData);

    if (response.status === 401) {
      handleUnauthorizedError();
      return;
    }

    if (!response.ok) {
      console.error(response.data.error);
      alert(response.data.error);
      setDownloadPdfError(response.data.error);
      return;
    }

    const downloadUrl = URL.createObjectURL(response.data);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `${tableName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  };

  const handleExport = () => {
    const columns = pdfPaymentsColumns;
    const tableData = payments;
    const tableName = `${student?.first_name} ${student?.last_name} payments history`;

    downloadPdf(tableName, columns, tableData);
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

  const openDeleteModal = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setAddPaymentError("");
    setEditPaymentError("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPayment(null);
  };

  const handleSubmit = (paymentData, sendEmail) => {
    selectedPayment ? editPayment(paymentData) :
      addPayment(paymentData, sendEmail);
  };

  useEffect(() => {
    loadStudent();
    loadPaymentsByStudentId();
    loadEnrollmentsByStudent();
  }, [id]);

  return (
    <PageLayout>
      <div>
        {studentLoading ? <p>Loading student...</p> : student && !loadStudentError && (
          <h1>{student.first_name} {student.last_name}</h1>
        )}

        {enrollmentLoading ? <p>Loading enrollment...</p> : !loadEnrollmentsByStudentError && (
          enrollments.map((enrollment) => (
            enrollment.school_year === "2026-2027" && <h2 key={enrollment.id}>Class: {enrollment.name}</h2>
          ))
        )}
      </div>

      {paymentsLoading ? <p>Loading payments...</p> :
        !loadPaymentsError &&
        <>
          <StudentPayments
            payments={payments}
            openCreateForm={openCreateForm}
            openEditForm={openEditForm}
            openDeleteModal={openDeleteModal}
          />

          <DataTable
            columns={paymentColumns}
            data={payments}
            title={"Payments History"}
            handleExport={handleExport}
          />
        </>
      }

      {showForm &&
        <ModalOverlay>
          <PaymentForm
            studentId={id}
            selectedMonth={selectedMonth}
            selectedPayment={selectedPayment}
            closeForm={closeForm}
            onSubmit={handleSubmit}
            formError={selectedPayment ? editPaymentError : addPaymentError}
            loading={selectedPayment ? editPaymentLoading : addPaymentLoading}
          />
        </ModalOverlay>
      }

      {showDeleteModal &&
        <Modal
          message={"Are you sure you want to delete this payment ?"}
          deleteFunction={removePayment}
          closeModal={closeDeleteModal}
          loading={removePaymentLoading}
        />
      }
    </PageLayout>
  );
}

export default StudentDetails;