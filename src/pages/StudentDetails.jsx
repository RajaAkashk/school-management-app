import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchStudents,
  deleteStudent,
} from "../features/students/studentSlice";
import Header from "../components/Header";

function StudentDetails() {
  const dispatch = useDispatch();
  const { studentId } = useParams();

  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  console.log("studentId:-", studentId);
  console.log("students:-", students);

  const filteredData = students.filter((data) => data._id === studentId);
  console.log("filteredData:", filteredData[0]);
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-3">Student Details</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {status === "Successfully Deleted" && (
          <p className="fs-5 fw-medium text-success">
            Student Deleted Successfully
          </p>
        )}
        {status === "success" && (
          <div>
            {filteredData.map((data) => (
              <div key={data.id}>
                <p key={data.id} className="fs-5">
                  <strong>Name: </strong>
                  {data.name}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Age: </strong>
                  {data.age}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Grade: </strong>
                  {data.grade}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Attendance: </strong>
                  {data.attendance}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Marks: </strong>
                  {data.marks}
                </p>
                <div key={data.id}>
                  <Link
                    className="btn btn-warning fs-5 me-2"
                    to="/addStudent"
                    state={{ student: filteredData[0] }}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger fs-5 me-2"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default StudentDetails;
