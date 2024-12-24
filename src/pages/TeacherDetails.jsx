import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchTeachers,
  deleteTeacher,
} from "../features/teachers/teacherSlice";
import Header from "../components/Header";

function TeacherDetails() {
  const dispatch = useDispatch();
  const { teacherId } = useParams();

  const teachers = useSelector((state) => state.teachers.teachers);
  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);

  console.log("teacherId:-", teacherId);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const filteredData = teachers.filter((data) => data._id === teacherId);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      dispatch(deleteTeacher(id));
    }
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-3">Teacher Details</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {status === "Successfully Deleted" && (
          <p className="fs-5 fw-medium text-success">Deleted Successfully</p>
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
                  <strong>Phone Number: </strong>
                  {data.contactNumber}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Email: </strong>
                  {data.email}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Gender: </strong>
                  {data.gender}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Subject: </strong>
                  {data.subject}
                </p>
                <p key={data.id} className="fs-5">
                  <strong>Experience: </strong>
                  {data.yearsOfExperience}yrs
                </p>

                <div key={data.id}>
                  <Link
                    className="btn btn-warning fs-5 me-2"
                    to="/addteacher"
                    state={{ teacher: filteredData[0] }}
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

export default TeacherDetails;
