import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "./teacherSlice";
import { Link } from "react-router-dom";

function TeacherView() {
  const dispatch = useDispatch();

  const teachers = useSelector((state) => state.teachers.teachers);
  const status = useSelector((state) => state.teachers.status);

  console.log("teachers:-", teachers);
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="py-4">
      <h1>Teachers</h1>{" "}
      <Link to="/addTeacher" className="btn btn-warning my-2">
        Add Teacher
      </Link>
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
        <ul className="list-group">
          {teachers.map((teacher) => (
            <li
              key={teacher._id}
              className="list-group-item d-flex justify-content-between"
            >
              <p className="fs-5 mt-2">
                <span className="me-2">
                  <strong>Name: </strong>
                  {teacher.name}
                </span>

                <span className="me-2">
                  <strong>Age: </strong>
                  {teacher.age}
                </span>

                <span className="me-2">
                  <strong>Subject: </strong>
                  {teacher.subject}
                </span>
                <span className="me-2">
                  <strong>Experience: </strong>
                  {teacher.yearsOfExperience} Yrs
                </span>
              </p>
              <Link
                to={`/teacher/${teacher._id}`}
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
}

export default TeacherView;
