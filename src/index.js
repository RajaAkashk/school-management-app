import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import App from "./App";
import AddStudentForm from "./pages/AddStudentForm";
import ClassesPage from "./pages/ClassesPage";
import SchoolPage from "./pages/SchoolPage";
import StudentDetails from "./pages/StudentDetails";
import TeacherPage from "./pages/TeacherPage";
import TeacherDetails from "./pages/TeacherDetails";
import AddTeacherForm from "./pages/AddTeacherForm";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addStudent",
    element: <AddStudentForm />,
  },
  {
    path: "/student/:studentId",
    element: <StudentDetails />,
  },
  {
    path: "/classes",
    element: <ClassesPage />,
  },
  {
    path: "/school",
    element: <SchoolPage />,
  },
  {
    path: "/teacher",
    element: <TeacherPage />,
  },
  {
    path: "/teacher/:teacherId",
    element: <TeacherDetails />,
  },
  {
    path: "/addTeacher",
    element: <AddTeacherForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
