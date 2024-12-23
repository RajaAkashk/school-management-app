import React from "react";
import Header from "../components/Header";
import { SchoolView } from "../features/school/SchoolView";

function SchoolPage() {
  return (
    <>
      <Header />
      <main className="container">
        <SchoolView />
      </main>
    </>
  );
}

export default SchoolPage;
