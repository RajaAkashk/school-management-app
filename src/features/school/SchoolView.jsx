import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";

export const SchoolView = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const totalStudents = useSelector((state) => state.school.totalStudents);
  const averageAttendance = useSelector(
    (state) => state.school.averageAttendance
  );
  const averageMarks = useSelector((state) => state.school.averageMarks);
  const topStudent = useSelector((state) => state.school.topStudent);

  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const averageAttendance =
        students.reduce((acc, curr) => acc + curr.attendance, 0) /
        totalStudents;
      const averageMarks =
        students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;
      const topStudent = students.reduce((acc, curr) =>
        acc.marks > curr.marks ? acc : curr
      );

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
        })
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [students, dispatch]);

  return (
    <>
      <div className="py-4">
        <h1>School View</h1>
        {status === "loading" && <p>Loading...</p>}
        {status === "success" && (
          <div>
            <p className="fs-5">
              <strong>Total Students:</strong> {totalStudents}
            </p>
            <p className="fs-5">
              <strong>Average Attendance:</strong> {(averageAttendance.toFixed(2))}
            </p>
            <p className="fs-5">
              <strong>Average Marks:</strong> {(averageMarks).toFixed(2)}
            </p>

            <p className="fs-5">
              <strong>Top Student:</strong> {topStudent.name}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
