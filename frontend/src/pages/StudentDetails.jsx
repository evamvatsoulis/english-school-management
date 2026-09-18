import { useParams } from "react-router-dom";

function StudentDetails() {
    const { id } = useParams();
  return (
    <div>
      <h1>Student Details</h1>
      <p>{id}</p>
    </div>
  );
}

export default StudentDetails;