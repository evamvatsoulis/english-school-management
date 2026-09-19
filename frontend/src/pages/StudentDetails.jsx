import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from '../services/studentService';
import Sidebar from '../components/Sidebar';
import '../styles/pages/StudentDetails.css';

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadStudent();
  }, [id]);

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">
        {student && (
          <div>
            <h1>{student.first_name}</h1>
            <p>{id}</p>
          </div>
        )}

        <div className="student-details-actions">
          <button className="edit-button">Edit student</button>
          <button className="add-payment-button">Add new payment</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;