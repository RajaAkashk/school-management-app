import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addNewStudent,
  updateStudent,
} from "../features/students/studentSlice";

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const studentToEdit = location.state?.student || null;
  console.log("studentToEdit:-", studentToEdit);

  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  console.log(status);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");
  const [alert, setAlert] = useState(false);

  const isEditing = Boolean(studentToEdit);

  useEffect(() => {
    if (isEditing) {
      setName(studentToEdit.name || "");
      setAge(studentToEdit.age || "");
      setGrade(studentToEdit.grade || "");
      setGender(studentToEdit.gender || "");
      setAttendance(studentToEdit.attendance || "");
      setMarks(studentToEdit.marks || "");
    }
  }, [isEditing, studentToEdit]);

  const addStudentFormHandler = (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      age: parseInt(age),
      grade,
      gender,
      attendance: parseInt(attendance),
      marks: parseInt(marks),
    };

    if (!isEditing) {
      dispatch(addNewStudent(newStudent));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    } else {
      dispatch(
        updateStudent({
          studentId: studentToEdit._id,
          updatedStudentData: newStudent,
        })
      );
    }

    setName("");
    setAge("");
    setGrade("");
    setGender("");
    setAttendance("");
    setMarks("");
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1>{isEditing ? "Edit Student" : "Add Student"}</h1>
        {alert && (
          <div className="alert alert-success" role="alert">
            New Student Added.
          </div>
        )}
        {/* {status === "success" && <p>Student successfully!</p>} */}
        {status === "update Student successfully" && (
          <p>Updated Student successfully!</p>
        )}
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error: {error}</p>}
        <form
          onSubmit={addStudentFormHandler}
          className="p-4 border rounded bg-light"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              id="age"
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="grade" className="form-label">
              Grade:
            </label>
            <input
              id="grade"
              type="text"
              className="form-control"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <div className="form-check">
              <input
                type="radio"
                id="male"
                value="Male"
                name="gender"
                className="form-check-input"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="female"
                value="Female"
                name="gender"
                className="form-check-input"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="attendance" className="form-label">
              Attendance:
            </label>
            <input
              id="attendance"
              type="number"
              className="form-control"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="marks" className="form-label">
              Marks:
            </label>
            <input
              id="marks"
              type="number"
              className="form-control"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddStudentForm;
