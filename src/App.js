import StudentView from "./features/students/StudentView";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/Header";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="container py-4">
        <h1>Student View</h1>
        <Link className="btn btn-warning my-3 fs-5" to="/addStudent">
          Add Student
        </Link>
        <StudentView />
      </main>
    </>
  );
}

export default App;
