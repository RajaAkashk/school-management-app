import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentSlice";
import { Link } from "react-router-dom";

const StudentView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h2>Student List</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {status === "success" && (
        <ul className="list-group">
          {students.map((student) => (
            <li
              key={student._id}
              className="list-group-item d-flex justify-content-between"
            >
              <p className="fs-5 mt-2">
                <span className="me-2">
                  <strong>Name: </strong>
                  {student.name}
                </span>

                <span className="me-2">
                  <strong>Age: </strong>
                  {student.age}
                </span>

                <span className="me-2">
                  <strong>Grade: </strong>
                  {student.grade}
                </span>
              </p>
              <Link
                to={`/student/${student._id}`}
                className="btn btn-warning fs-5 pt-2"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentView;
