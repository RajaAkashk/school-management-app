import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";

function ClassesPage() {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  const [studentsData, setStudentsData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      setStudentsData(students);
    }
  }, [students]);
  console.log("studentsData:", studentsData);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue);
    if (selectedValue === "All") {
      setStudentsData(students);
    } else {
      const filteredStudents = students.filter(
        (data) => data.gender === selectedValue
      );
      setStudentsData(filteredStudents);
    }
}

    const handleSortChange = (event) => {
      const selectedValue = event.target.value;
      setSortBy(selectedValue);

      const sortedStudents = [...studentsData].sort((a, b) => {
        if (selectedValue === "Name") {
          return a.name.localeCompare(b.name);
        } else if (selectedValue === "Marks") {
          return a.marks - b.marks;
        } else if (selectedValue === "Attendance") {
          return a.attendance - b.attendance;
        }
        return 0; // No sorting if the selected value is invalid
      });

      setStudentsData(sortedStudents);
    };

    return (
      <>
        <Header />
        <main className="container py-5">
          <div>
            <h1>Class View</h1>

            <div className="py-3">
              <label
                htmlFor="filterByGender"
                className="form-label me-3 fs-5 fw-medium "
              >
                Filter By Gender:
                <select
                  id="filterByGender"
                  value={filter}
                  className="form-select"
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Male">Boys</option>
                  <option value="Female">Girls</option>
                </select>
              </label>

              <label
                htmlFor="sortBy"
                className="form-label me-3 fs-5 fw-medium "
              >
                Sort By:
                <select
                  id="sortBy"
                  value={sortBy}
                  className="form-select"
                  onChange={handleSortChange}
                >
                  <option value="Name">Name</option>
                  <option value="Marks">Marks</option>
                  <option value="Attendance">Attendance</option>
                </select>
              </label>
            </div>

            {status === "loading" && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {status === "success" && (
              <ul className="list-group">
                {studentsData.map((student) => (
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
                        <strong>Gender: </strong>
                        {student.gender}
                      </span>

                      <span className="me-2">
                        <strong>Marks: </strong>
                        {student.marks}
                      </span>

                      <span className="me-2">
                        <strong>Attendance: </strong>
                        {student.attendance}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </>
    );
  };


export default ClassesPage;
