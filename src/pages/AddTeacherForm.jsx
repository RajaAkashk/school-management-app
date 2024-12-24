import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addNewTeacher,
  updateTeacher,
} from "../features/teachers/teacherSlice";

const AddTeacherForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Get teacher data for editing if available
  const teacherToEdit = location.state?.teacher || null;
  console.log("teacherToEdit:-", teacherToEdit);

  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);

  console.log(status);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const isEditing = Boolean(teacherToEdit);

  useEffect(() => {
    if (isEditing) {
      setName(teacherToEdit.name || "");
      setAge(teacherToEdit.age || "");
      setSubject(teacherToEdit.subject || "");
      setGender(teacherToEdit.gender || "");
      setYearsOfExperience(teacherToEdit.yearsOfExperience || "");
      setContactNumber(teacherToEdit.contactNumber || "");
      setEmail(teacherToEdit.email || "");
    }
  }, [isEditing, teacherToEdit]);

  const addTeacherFormHandler = (e) => {
    e.preventDefault();

    const newTeacher = {
      name,
      age: parseInt(age),
      subject,
      gender,
      yearsOfExperience: parseInt(yearsOfExperience),
      contactNumber,
      email,
    };

    if (!isEditing) {
      dispatch(addNewTeacher(newTeacher));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    } else {
      dispatch(
        updateTeacher({
          teacherId: teacherToEdit._id,
          updatedTeachersData: newTeacher,
        })
      );
    }

    // Reset form fields after submission
    setName("");
    setAge("");
    setSubject("");
    setGender("");
    setYearsOfExperience("");
    setContactNumber("");
    setEmail("");
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1>{isEditing ? "Edit Teacher" : "Add Teacher"}</h1>
        {alert && (
          <div className="alert alert-success" role="alert">
            New Teacher Added.
          </div>
        )}
        {status === "updating" && <p>Updating...</p>}
        {status === "error" && <p>Error: {error}</p>}
        <form
          onSubmit={addTeacherFormHandler}
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
            <label htmlFor="subject" className="form-label">
              Subject:
            </label>
            <input
              id="subject"
              type="text"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            <label htmlFor="yearsOfExperience" className="form-label">
              Years of Experience:
            </label>
            <input
              id="yearsOfExperience"
              type="number"
              className="form-control"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number:
            </label>
            <input
              id="contactNumber"
              type="text"
              className="form-control"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={status === "loading" || status === "updating"}
          >
            {status === "loading" || status === "updating"
              ? "Submitting..."
              : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
};

export default AddTeacherForm;
