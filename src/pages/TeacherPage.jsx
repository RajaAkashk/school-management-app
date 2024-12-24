import React from "react";
import TeacherView from "../features/teachers/TeacherView";
import Header from "../components/Header";

function TeacherPage() {
  return (
    <>
      <Header />
      <main className="container">
        <TeacherView />
      </main>
    </>
  );
}

export default TeacherPage;
